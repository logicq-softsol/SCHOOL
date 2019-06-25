package com.logicq.school.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.school.exception.SucessMessage;
import com.logicq.school.model.ActivationDetails;
import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.Message;
import com.logicq.school.model.SessionTracker;
import com.logicq.school.model.SubjectDetails;
import com.logicq.school.model.TopicDetails;
import com.logicq.school.model.User;
import com.logicq.school.repository.ChapterDetailsRepo;
import com.logicq.school.repository.ClassesDetailsRepo;
import com.logicq.school.repository.LoginDetailsRepo;
import com.logicq.school.repository.ProductActivationRepo;
import com.logicq.school.repository.SessionTrackerRepo;
import com.logicq.school.repository.SubjectDetailsRepo;
import com.logicq.school.repository.TopicDetailsRepo;
import com.logicq.school.repository.UserDetailsRepo;
import com.logicq.school.security.JwtTokenProvider;
import com.logicq.school.security.UserPrincipal;
import com.logicq.school.utils.LogicQEncryptionAndDecryption;
import com.logicq.school.utils.SchoolDateUtils;
import com.logicq.school.utils.SchoolRestClient;
import com.logicq.school.utils.SchoolSecurityUtils;
import com.logicq.school.utils.SucessHandlerUtils;
import com.logicq.school.vo.ActivateKey;
import com.logicq.school.vo.ActivationVO;
import com.logicq.school.vo.LicenseDetails;
import com.logicq.school.vo.LicenseKey;
import com.logicq.school.vo.LoginVO;

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
	LogicQEncryptionAndDecryption logicQEncryptionAndDecryption;

	@Autowired
	SchoolRestClient schoolRestClient;

	@Autowired
	Environment env;

	@Autowired
	SessionTrackerRepo sessionTrackerRepo;

	@Autowired
	TopicDetailsRepo topicDetailsRepo;

	@Autowired
	ClassesDetailsRepo classesDetailsRepo;

	@Autowired
	SubjectDetailsRepo subjectDetailsRepo;

	@Autowired
	ChapterDetailsRepo chapterDetailsRepo;

	@RequestMapping(value = "/activateProduct", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> activateProductForClient(@RequestBody LicenseKey licnkey) throws Exception {
		if (!StringUtils.isEmpty(licnkey.getParam1()) && !StringUtils.isEmpty(licnkey.getParam2())
				&& !StringUtils.isEmpty(licnkey.getParam3()) && !StringUtils.isEmpty(licnkey.getParam4())) {
			String hostName = schoolSecurityUtils.getSystemHostName();
			LicenseDetails licenseDetails = schoolRestClient.validateLicense(hostName).getBody();
			if (null != licenseDetails) {
				String inputkey = licnkey.getParam1() + "-" + licnkey.getParam2() + "-" + licnkey.getParam3() + "-"
						+ licnkey.getParam4();
				ActivateKey activateKey = schoolRestClient.getLicenseKey(hostName).getBody();
				String licenseKey = logicQEncryptionAndDecryption.decrypt(licenseDetails.getLicenseKey(),
						activateKey.getKey());
				if (inputkey.equals(licenseKey) && !StringUtils.isEmpty(activateKey.getKey())) {
					ActivationDetails activationDetail = new ActivationDetails();
					activationDetail.setActivationDate(schoolDateUtils.currentDate());
					activationDetail.setActivationLicense(licenseKey);
					activationDetail.setActivationToken(activateKey.getKey());
					activationDetail.setLastUpdate(schoolDateUtils.currentDate());
					activationDetail.setProductName(licenseDetails.getProductName());
					activationDetail.setProductStatus("ACTIVE");
					activationDetail.setExpiryDate(schoolDateUtils.getExpiryDate(licenseDetails.getValidityDay()));
					activationDetail.setProductVersion(env.getProperty("schoool.version"));
					activationDetail.setActivationFor(hostName);
					activationDetail.setActivationDays(licenseDetails.getValidityDay());
					productActivationRepo.save(activationDetail);
					return new ResponseEntity<SucessMessage>(new SucessMessage(schoolDateUtils.currentDate(),
							"Products Activated Sucessfully", "SUCESS"), HttpStatus.OK);
				}
			} else {
				return new ResponseEntity<SucessMessage>(new SucessMessage(schoolDateUtils.currentDate(),
						"No License Regisetr For This System", "ERROR"), HttpStatus.OK);
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
		if (null != activationDeatils && !"EXPIRED".equals(activationDeatils.getProductStatus())) {
			if (!StringUtils.isEmpty(login.getUserName())) {
				LoginDetails loginDetails = loginDetailsRepo.findByUserName(login.getUserName());

				if (null != loginDetails) {
					boolean result = passwordEncoder.matches(login.getPassword(), loginDetails.getPassword());
					if (result) {
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
									new SucessMessage(schoolDateUtils.currentDate(), jwt, "acess_token"),
									HttpStatus.OK);
						} else {
							throw new ValidationException("ERROR-LOGIN");
						}
					}
					return new ResponseEntity<SucessMessage>(new SucessMessage(schoolDateUtils.currentDate(),
							"Invalid login Check your password or user name", "ERROR"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<SucessMessage>(
						new SucessMessage(schoolDateUtils.currentDate(), "Invalid login", "ERROR"),
						HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity<SucessMessage>(new SucessMessage(schoolDateUtils.currentDate(),
					"Product Expried ,Please check with Vendor.", "ERROR"), HttpStatus.BAD_REQUEST);
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

	@RequestMapping(value = "/changePassword", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> forgetPassword(@RequestBody LoginVO loginVO) throws Exception {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			LoginDetails loginDetails = loginDetailsRepo.findByUserName(loginVO.getUserName());
			if (null != loginDetails && !StringUtils.isEmpty(loginVO.getPassword())) {
				loginDetails.setPassword(passwordEncoder.encode(loginVO.getPassword()));
				loginDetails.setLoginStatus("IN_ACTIVE");
				loginDetailsRepo.save(loginDetails);
			}
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "PCLOGIN", "Password Change Sucessfully"),
					HttpStatus.OK);
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "ERROR", "Unable to Change Password."),
				HttpStatus.BAD_REQUEST);
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
		if (StringUtils.isEmpty(login.getUser().getRole())) {
			login.getUser().setRole("USER");
		} else if ("ADMIN".equals(login.getUser().getRole())) {
			User adminUser = userDetailsRepo.findByRole("ADMIN");
			if (null != adminUser) {
				return new ResponseEntity<Message>(sucessHandlerUtils.handleSucessMessage("AREGA", "/api/userRegister",
						"More Than one Admin cannot be register.Please contact Admin"), HttpStatus.OK);
			}

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

	@RequestMapping(value = "/checkProductActivationDate", method = RequestMethod.GET)
	public ResponseEntity<ActivationVO> productDate() throws Exception {
		String hostName = schoolSecurityUtils.getSystemHostName();
		ActivationDetails activationDeatils = productActivationRepo.findByActivationFor(hostName);
		ActivationVO activation = new ActivationVO();
		activation.setActivationDate(activationDeatils.getActivationDate());
		activation.setExpiryDate(activationDeatils.getExpiryDate());
		activation.setRemaningDays(new Long(activationDeatils.getActivationDays()).intValue());
		return new ResponseEntity<ActivationVO>(activation, HttpStatus.OK);

	}

	@RequestMapping(value = "/session", method = RequestMethod.GET)
	public ResponseEntity<List<SessionTracker>> getSessionForTodayForUser() throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<SessionTracker> sessionList = sessionTrackerRepo.findByStartTimeGreaterThanEqualAndUserName(
				schoolDateUtils.findTodayStartDate(), loginDetail.getUserName());
		return new ResponseEntity<List<SessionTracker>>(sessionList, HttpStatus.OK);

	}

	@RequestMapping(value = "/sessions", method = RequestMethod.GET)
	public ResponseEntity<List<SessionTracker>> getAllSessionForToday() throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<SessionTracker> sessionList = sessionTrackerRepo
				.findByStartTimeGreaterThanEqual(schoolDateUtils.findTodayStartDate());
		return new ResponseEntity<List<SessionTracker>>(sessionList, HttpStatus.OK);

	}

	@RequestMapping(value = "/session/{sessionId}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> updateSessionTracker(@PathVariable Long sessionId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		SessionTracker sessnionTracker = sessionTrackerRepo.findOne(sessionId);
		if (null != sessnionTracker) {
			sessionTrackerRepo.delete(sessnionTracker);
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Your Session Delete Sucess Fully", "LESSON_PLAY"),
					HttpStatus.OK);
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "No Session Exist For this Lesson", "LESSON_PLAY"),
				HttpStatus.BAD_REQUEST);

	}

	@RequestMapping(value = "/session/{classId}/{subjectId}/{chapterId}/{topicId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> startSessionTracker(@PathVariable Long classId, @PathVariable Long subjectId,
			@PathVariable Long chapterId, @PathVariable Long topicId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		TopicDetails topic = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndId(classId, subjectId, chapterId,
				topicId);
		ClassDetails classDetails = classesDetailsRepo.findOne(classId);
		SubjectDetails subject = subjectDetailsRepo.findByClassIdAndId(classId, subjectId);
		ChapterDetails chapter = chapterDetailsRepo.findByClassIdAndSubjectIdAndId(classId, subjectId, chapterId);
		if (null != topic && !StringUtils.isEmpty(topic.getPlayFileURL())) {
			SessionTracker sessionTracker = new SessionTracker();
			sessionTracker.setClassId(classId);
			sessionTracker.setSubjectId(subjectId);
			sessionTracker.setChapterId(chapterId);
			sessionTracker.setTopicId(topicId);
			sessionTracker.setClassName(classDetails.getDisplayName());
			sessionTracker.setSubjectName(subject.getDisplayName());
			sessionTracker.setChapterName(chapter.getDisplayName());
			sessionTracker.setTopicName(topic.getDisplayName());
			sessionTracker.setUserName(loginDetail.getUserName());
			sessionTracker.setStartTime(schoolDateUtils.currentDate());
			sessionTracker.setTopicRequiredTime(topic.getPlayFileTime());
			sessionTracker.setEndTime(sessionTracker.getStartTime());
			sessionTracker.setStatus("PENDING");
			sessionTrackerRepo.save(sessionTracker);
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Your Lesson Started Now", "LESSON_PLAY"),
					HttpStatus.OK);

		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "No Video File exist For this Lesson", "LESSON_PLAY"),
				HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/session/{classId}/{subjectId}/{chapterId}/{topicId}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> endSessionTracker(@PathVariable Long classId, @PathVariable Long subjectId,
			@PathVariable Long chapterId, @PathVariable Long topicId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		SessionTracker sessnionTracker = sessionTrackerRepo.findByUserNameAndClassIdAndSubjectIdAndChapterIdAndTopicId(
				loginDetail.getUserName(), classId, subjectId, chapterId, topicId);
		if (null != sessnionTracker) {
			sessnionTracker.setEndTime(schoolDateUtils.currentDate());
			sessionTrackerRepo.save(sessnionTracker);
			return new ResponseEntity<SucessMessage>(new SucessMessage(schoolDateUtils.currentDate(),
					"Your Session Closed For This Lesson", "LESSON_PLAY"), HttpStatus.OK);
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "No Video File exist For this Lesson", "LESSON_PLAY"),
				HttpStatus.BAD_REQUEST);
	}

}
