package com.logicq.license.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.license.exception.SucessMessage;
import com.logicq.license.model.LoginDetails;
import com.logicq.license.model.User;
import com.logicq.license.repository.LoginDetailsRepo;
import com.logicq.license.repository.UserDetailsRepo;
import com.logicq.license.security.JwtTokenProvider;
import com.logicq.license.security.UserPrincipal;
import com.logicq.license.utils.SchoolDateUtils;
import com.logicq.license.utils.LicenseSecurityUtils;
import com.logicq.license.utils.SucessHandlerUtils;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api")
public class LoginController {

	@Autowired
	UserDetailsRepo userDetailsRepo;

	@Autowired
	LoginDetailsRepo loginDetailsRepo;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	SchoolDateUtils schoolDateUtils;

	@Autowired
	SucessHandlerUtils sucessHandlerUtils;

	@Autowired
	HttpServletRequest context;

	@Autowired
	LicenseSecurityUtils licenseSecurityUtils;

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> login(@RequestBody LoginDetails login) throws Exception {
		if (!StringUtils.isEmpty(login.getUserName())) {
			LoginDetails loginDetails = loginDetailsRepo.findByUserName(login.getUserName());
			if (null != loginDetails) {
				User userDetails = userDetailsRepo.findByUserName(login.getUserName());
				UserPrincipal usrPrincipal = UserPrincipal.create(userDetails, loginDetails);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						usrPrincipal, null, usrPrincipal.getAuthorities());

				SecurityContextHolder.getContext().setAuthentication(authentication);
				if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
					String jwt = tokenProvider.generateToken(authentication);
					if (null != loginDetails) {
						loginDetails.setLoginTime(schoolDateUtils.currentDate());
						loginDetails.setLoginStatus("ACTIVE");
						loginDetailsRepo.save(loginDetails);
					}
					return new ResponseEntity<SucessMessage>(
							new SucessMessage(schoolDateUtils.currentDate(), jwt, "acess_token"), HttpStatus.OK);
				} else {
					throw new ValidationException("ERROR-LOGIN");
				}
			}
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Invalid login", "ERROR"), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/logout", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> logout(@RequestBody User user) throws Exception {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			String userName = tokenProvider.getUserIdFromJWT(tokenProvider.getJwtFromRequest(context));
			LoginDetails loginDetails = loginDetailsRepo.findByUserName(userName);
			if (null != loginDetails) {
				loginDetails.setLoginStatus("IN_ACTIVE");
				loginDetailsRepo.save(loginDetails);
			}
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Logout Sucess ", "SLOGOUT"), HttpStatus.OK);
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Unable to logout ", "ERROR"), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/load", method = RequestMethod.GET)
	public ResponseEntity<User> loadUserDetails() {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			String userName = tokenProvider.getUserIdFromJWT(tokenProvider.getJwtFromRequest(context));
			return new ResponseEntity<User>(userDetailsRepo.findByUserName(userName), HttpStatus.OK);
		}
		return new ResponseEntity<User>(new User(), HttpStatus.BAD_REQUEST);
	}
	
	
}
