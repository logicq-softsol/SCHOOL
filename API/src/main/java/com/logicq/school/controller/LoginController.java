package com.logicq.school.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.core.env.Environment;
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
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.Message;
import com.logicq.school.model.User;
import com.logicq.school.repository.LoginDetailsRepo;
import com.logicq.school.repository.ProductActivationRepo;
import com.logicq.school.repository.UserDetailsRepo;
import com.logicq.school.security.JwtTokenProvider;
import com.logicq.school.security.UserPrincipal;
import com.logicq.school.utils.SchoolDateUtils;
import com.logicq.school.utils.SchoolRestClient;
import com.logicq.school.utils.SchoolSecurityUtils;
import com.logicq.school.utils.SucessHandlerUtils;
import com.logicq.school.vo.LicenseDetails;
import com.logicq.school.vo.LicenseKey;
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

	@Autowired
	SchoolRestClient schoolRestClient;

	@Autowired
	Environment env;

	@RequestMapping(value = "/activateProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> registerPartner(@RequestBody LicenseKey licnkey) throws Exception {
		if (!StringUtils.isEmpty(licnkey.getParam1()) && !StringUtils.isEmpty(licnkey.getParam2())
				&& !StringUtils.isEmpty(licnkey.getParam3()) && !StringUtils.isEmpty(licnkey.getParam4())) {
			String hostName = schoolSecurityUtils.getSystemHostName();
			LicenseDetails licenseDetails = schoolRestClient.validateLicense(hostName).getBody();
			String inputkey = licnkey.getParam1() + "-" + licnkey.getParam2() + "-" + licnkey.getParam3() + "-"
					+ licnkey.getParam4();
			if (inputkey.equals(licenseDetails.getLicenseKey())) {
				ActivationDetails activationDetail = new ActivationDetails();
				activationDetail.setActivationDate(schoolDateUtils.currentDate());
				activationDetail.setActivationKey(licenseDetails.getPrivateKey());
				activationDetail.setLastUpdate(schoolDateUtils.currentDate());
				activationDetail.setProductName(licenseDetails.getProductName());
				activationDetail.setProductStatus("ACTIVE");
				activationDetail.setExpiryDate(schoolDateUtils.getExpiryDate(licenseDetails.getValidityDay()));
				activationDetail.setProductVersion(env.getProperty("schoool.version"));
				activationDetail.setActivationFor(hostName);
				productActivationRepo.save(activationDetail);
				return new ResponseEntity<SucessMessage>(
						new SucessMessage(schoolDateUtils.currentDate(), "Products Activated Sucessfully", "SUCESS"),
						HttpStatus.OK);
			}
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Unable to Register Product", "ERROR"),
				HttpStatus.EXPECTATION_FAILED);
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> login(@RequestBody LoginDetails login) throws Exception {
		String hostName = schoolSecurityUtils.getSystemHostName();
		ActivationDetails activationDeatils = productActivationRepo.findByActivationFor(hostName);
		if (null != activationDeatils) {
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
					sucessHandlerUtils.handleSucessMessage("AREG", "/api/userRegister", "User Already Exist."),
					HttpStatus.OK);
		}
		if (!StringUtils.isEmpty(login.getUserName())) {
			login.getUser().setUserName(login.getUserName());
			userDetailsRepo.save(login.getUser());

			LoginDetails newlogin = new LoginDetails();
			newlogin.setUserName(login.getUserName());
			newlogin.setPassword(passwordEncoder.encode(login.getPassword()));
			newlogin.setLoginBy("SCHOOL_APP");
			newlogin.setLoginTime(new Date());
			newlogin.setLoginStatus("IN_ACTIVE");
			loginDetailsRepo.save(newlogin);
			return new ResponseEntity<Message>(
					sucessHandlerUtils.handleSucessMessage("SREG", "/api/register", "User Register Sucessfully"),
					HttpStatus.OK);
		}
		return new ResponseEntity<Message>(
				sucessHandlerUtils.handleSucessMessage("EREG", "/api/register", "User Unable to Register"),
				HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/validateProduct", method = RequestMethod.GET)
	public ResponseEntity<SucessMessage> checkProductValidity() throws Exception {
		String hostName = schoolSecurityUtils.getSystemHostName();
		ActivationDetails activationDeatils = productActivationRepo.findByActivationFor(hostName);
		if (null != activationDeatils) {
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Product Validated", "LICENSED"), HttpStatus.OK);
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Product is Not Valid For this System", "NO_LICENSE"),
				HttpStatus.OK);
	}

}
