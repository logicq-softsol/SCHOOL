package com.logicq.license.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.license.exception.SucessMessage;
import com.logicq.license.model.LicenseDetails;
import com.logicq.license.model.LoginDetails;
import com.logicq.license.repository.LicenseDetailRepo;
import com.logicq.license.utils.LicenseSecurityUtils;
import com.logicq.license.utils.SchoolDateUtils;
import com.logicq.license.vo.LicenseVO;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api/school/")
public class LicenseController {

	@Autowired
	SchoolDateUtils schoolDateUtils;

	@Autowired
	LicenseDetailRepo licenseDetailRepo;

	@Autowired
	LicenseSecurityUtils licenseSecurityUtils;

	@RequestMapping(value = "/license", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> logout(@RequestBody LicenseDetails licenseDetails) throws Exception {
		LoginDetails loginDetail = licenseSecurityUtils.getUserFromSecurityContext();
		if (null != loginDetail) {
			licenseDetails.setCreationTime(schoolDateUtils.currentDate());
			licenseDetails.setCreatedBy(loginDetail.getUserName());
			licenseDetails.setStatus("IN_ACTIVE");
			licenseDetailRepo.save(licenseDetails);
			
			
			return new ResponseEntity<SucessMessage>(
					new SucessMessage(schoolDateUtils.currentDate(), "Sucess Fully Registered", "SUCESS"),
					HttpStatus.OK);
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Unable to logout ", "ERROR"), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/license", method = RequestMethod.GET)
	public ResponseEntity<List<LicenseDetails>> findAllLicense() {
		List<LicenseDetails> licenseList = new ArrayList<>();
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			licenseList = licenseDetailRepo.findAll();
			return new ResponseEntity<List<LicenseDetails>>(licenseList, HttpStatus.OK);
		}
		return new ResponseEntity<List<LicenseDetails>>(licenseList, HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/validateLicense", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<LicenseDetails> logout(@RequestBody LicenseVO licenseVO) throws Exception {
		LicenseDetails licenseDetails = licenseDetailRepo.findByHostNameAndLicenseKey(licenseVO.getHostName(),
				licenseVO.getLicenseKey());
		if (null != licenseDetails) {
			return new ResponseEntity<LicenseDetails>(licenseDetails, HttpStatus.OK);
		}

		return new ResponseEntity<LicenseDetails>(licenseDetails, HttpStatus.BAD_REQUEST);
	}

}
