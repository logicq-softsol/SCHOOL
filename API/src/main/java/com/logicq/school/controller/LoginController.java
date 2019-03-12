package com.logicq.school.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
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

import com.logicq.school.exception.SucessMessage;
import com.logicq.school.model.ActivationDetails;
import com.logicq.school.model.LicenseKey;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.Message;
import com.logicq.school.model.User;
import com.logicq.school.repository.LoginDetailsRepo;
import com.logicq.school.repository.ProductActivationRepo;
import com.logicq.school.repository.UserDetailsRepo;
import com.logicq.school.security.JwtTokenProvider;
import com.logicq.school.security.UserPrincipal;
import com.logicq.school.utils.SchoolDateUtils;
import com.logicq.school.utils.SchoolSecurityUtils;
import com.logicq.school.utils.SucessHandlerUtils;
import com.logicq.school.vo.ActivationVO;
import com.logicq.school.vo.LoginVO;
import com.logicq.school.vo.RecoverVO;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api")
public class LoginController {

	@Autowired
	UserDetailsRepo userDetailsRepo;

	@Autowired
	LoginDetailsRepo loginDetailsRepo;

	@Autowired
	ProductActivationRepo productActivationRepo;

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
	SchoolSecurityUtils schoolSecurityUtils;

	@RequestMapping(value = "/activateProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> registerPartner(@RequestBody LicenseKey licnkey) throws Exception {
		if (!StringUtils.isEmpty(licnkey.getParam1()) && !StringUtils.isEmpty(licnkey.getParam2())
				&& !StringUtils.isEmpty(licnkey.getParam3()) && !StringUtils.isEmpty(licnkey.getParam4())) {

			List<String> licenseData = Files
					.readAllLines(new File(getClass().getClassLoader().getResource("license.txt").getFile()).toPath());
			String decryptedkey = schoolSecurityUtils.decryptText(licenseData.get(0),
					schoolSecurityUtils.getPublic("publicKey"));
			String inputkey = licnkey.getParam1() + licnkey.getParam2() + licnkey.getParam3() + licnkey.getParam4();
			if (inputkey.equals(decryptedkey)) {
				return new ResponseEntity<SucessMessage>(
						new SucessMessage(schoolDateUtils.currentDate(), "Products Valided Sucessfully", "SUCESS"),
						HttpStatus.OK);
			}
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Unable to Register Product", "ERROR"),
				HttpStatus.EXPECTATION_FAILED);
	}

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

	@RequestMapping(value = "/recoverAccount", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> recoverAccount(@RequestBody RecoverVO recover) throws Exception {
		ActivationDetails activationDetail = productActivationRepo
				.findByActivationKey(passwordEncoder.encode(recover.getLicenseKey()));
		if (null != activationDetail) {
			if (passwordEncoder.matches(recover.getLicenseKey(), activationDetail.getActivationKey())) {
				User user = userDetailsRepo.findByUserName(recover.getUserName());
				if (null != user) {
					LoginDetails loginDetails = loginDetailsRepo.findByUserName(user.getUserName());
					loginDetails.setPassword(passwordEncoder.encode(recover.getNewPassword()));
					loginDetailsRepo.save(loginDetails);
					return new ResponseEntity<SucessMessage>(
							new SucessMessage(schoolDateUtils.currentDate(), "Password Change SucessFully", "SUCESS"),
							HttpStatus.OK);
				}

			}
		}

		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Invalid login", "ERROR"), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/load", method = RequestMethod.GET)
	public ResponseEntity<User> loadUserDetails() {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			String userName = tokenProvider.getUserIdFromJWT(tokenProvider.getJwtFromRequest(context));
			return new ResponseEntity<User>(userDetailsRepo.findByUserName(userName), HttpStatus.OK);
		}
		return new ResponseEntity<User>(new User(), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public ResponseEntity<List<User>> findAllUser() {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			return new ResponseEntity<List<User>>(userDetailsRepo.findAll(), HttpStatus.OK);
		}
		return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/userRegister", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Message> registerUser(@RequestBody LoginVO login) throws Exception {
		if (userDetailsRepo.findByUserName(login.getUserName()) != null) {
			return new ResponseEntity<Message>(
					sucessHandlerUtils.handleSucessMessage("AREG", "/api/userRegister", "Email Already Exist."),
					HttpStatus.OK);
		}
		if (!StringUtils.isEmpty(login.getUserName())) {
			userDetailsRepo.save(login.getUser());

			LoginDetails newlogin = new LoginDetails();
			newlogin.setUserName(login.getUserName());
			newlogin.setPassword(passwordEncoder.encode(login.getPassword()));
			newlogin.setLoginBy("SCHOOL_APP");
			newlogin.setLoginTime(new Date());
			loginDetailsRepo.save(newlogin);
			return new ResponseEntity<Message>(sucessHandlerUtils.handleSucessMessage("SREG", "/api/register"),
					HttpStatus.OK);
		}
		return new ResponseEntity<Message>(sucessHandlerUtils.handleSucessMessage("EREG", "/api/register"),
				HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/validateProduct", method = RequestMethod.GET)
	public ResponseEntity<SucessMessage> checkProductValidity() {
		// need to code to check enecrytpted key with data base
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Product Not Register", "NO_LICENSE"), HttpStatus.OK);
	}

}
