package com.logicq.school.controller;

import java.util.List;

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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.school.exception.SucessMessage;
import com.logicq.school.model.ActivationDetails;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.User;
import com.logicq.school.repository.LoginDetailsRepo;
import com.logicq.school.repository.ProductActivationRepo;
import com.logicq.school.repository.UserDetailsRepo;
import com.logicq.school.security.JwtTokenProvider;
import com.logicq.school.security.UserPrincipal;
import com.logicq.school.utils.SchoolDateUtils;
import com.logicq.school.vo.ActivationVO;
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
	HttpServletRequest context;

	@RequestMapping(value = "/activateProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> registerPartner(@RequestBody ActivationVO activateDetails) throws Exception {

		List<ActivationDetails> activationList = productActivationRepo.findAll();
		if (activationList.size() > 1) {
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Product Register Multipule time", "ERROR"),
					HttpStatus.BAD_REQUEST);
		}

		if (activationList.size() == 1) {
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Product Already Register", "ERROR"),
					HttpStatus.BAD_REQUEST);
		}

		if (activationList.isEmpty() && !StringUtils.isEmpty(activateDetails.getLicense())
				&& !StringUtils.isEmpty(activateDetails.getLogin().getUserName())) {
			ActivationDetails activationDetails = new ActivationDetails();
			if (null == activateDetails.getActivationDate()) {
				activationDetails.setActivationDate(schoolDateUtils.currentDate());
			} else {
				activationDetails.setActivationDate(activateDetails.getActivationDate());
			}

			activationDetails.setActivationKey(passwordEncoder.encode(activateDetails.getLicense()));
			activationDetails.setLicenseKey(activateDetails.getLicense());
			activationDetails.setExpiryDate(activateDetails.getExpiryDate());
			activationDetails.setProductName(activateDetails.getProductName());
			activationDetails.setProductStatus(activateDetails.getProductStatus());
			activationDetails.setProductVersion(activateDetails.getProductVersion());

			User userDetails = new User();
			userDetails.setAddress(activateDetails.getUser().getAddress());
			userDetails.setCity(activateDetails.getUser().getCity());
			userDetails.setCountry(activateDetails.getUser().getCountry());
			userDetails.setEmail(activateDetails.getUser().getEmail());
			userDetails.setFirstname(activateDetails.getUser().getFirstname());
			userDetails.setLastname(activateDetails.getUser().getLastname());
			userDetails.setMobileno(activateDetails.getUser().getMobileno());
			userDetails.setPostalcode(activateDetails.getUser().getPostalcode());
			userDetails.setUserName(activateDetails.getLogin().getUserName());
			userDetails.setRole(activateDetails.getUser().getRole());

			LoginDetails loginDetails = new LoginDetails();
			loginDetails.setLoginStatus("IN_ACTIVE");
			loginDetails.setUserName(activateDetails.getLogin().getUserName());
			loginDetails.setPassword(passwordEncoder.encode(activateDetails.getLogin().getPassword()));

			productActivationRepo.save(activationDetails);
			userDetailsRepo.save(userDetails);
			loginDetailsRepo.save(loginDetails);

			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Product Register Sucessfully", "SUCESS"),
					HttpStatus.OK);
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

	@RequestMapping(value = "/validateProduct", method = RequestMethod.GET)
	public ResponseEntity<SucessMessage> checkProductValidity() {

		List<ActivationDetails> activationList = productActivationRepo.findAll();
		if (null != activationList && activationList.size() > 1) {
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Product Register Multipule time", "ERROR"),
					HttpStatus.BAD_REQUEST);
		}

		if (null != activationList && activationList.size() == 1) {
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Product Register", "SUCESS"), HttpStatus.OK);
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Product Not Register", "NO_LICENSE"), HttpStatus.OK);
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
