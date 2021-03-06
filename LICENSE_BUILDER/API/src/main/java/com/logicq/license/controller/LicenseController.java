package com.logicq.license.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.license.exception.SucessMessage;
import com.logicq.license.model.LicenseDetails;
import com.logicq.license.model.LicenseKey;
import com.logicq.license.model.LoginDetails;
import com.logicq.license.repository.LicenseDetailRepo;
import com.logicq.license.repository.LicenseKeyRepo;
import com.logicq.license.utils.LicenseBuildUtil;
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

	@Autowired
	LicenseBuildUtil licenseBuildUtil;

	@Autowired
	LicenseKeyRepo licenseKeyRepo;

	@RequestMapping(value = "/license", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> buildLicense(@RequestBody LicenseDetails licenseDetails) throws Exception {
		LoginDetails loginDetail = licenseSecurityUtils.getUserFromSecurityContext();
		if (null != loginDetail) {
			LicenseDetails fetchLicensed = licenseDetailRepo.findByHostName(licenseDetails.getHostName());
			if (null == fetchLicensed) {
				licenseDetails.setCreationTime(schoolDateUtils.currentDate());
				licenseDetails.setCreatedBy(loginDetail.getUserName());
				licenseDetails.setStatus("IN_ACTIVE");
				String key = licenseBuildUtil.buildproductKey(licenseDetails);
				licenseDetails.setLicenseKey(key);
				licenseDetailRepo.save(licenseDetails);
				licenseBuildUtil.generateLicenseFile(licenseDetails);
				return new ResponseEntity<SucessMessage>(
						new SucessMessage(schoolDateUtils.currentDate(), "Sucess Fully Registered", "SUCESS"),
						HttpStatus.OK);
			} else {
				licenseBuildUtil.generateLicenseFile(licenseDetails);
				return new ResponseEntity<SucessMessage>(
						new SucessMessage(schoolDateUtils.currentDate(), "Licese exist for Host Name", "LICENSE_EXIST"),
						HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "Unable to logout ", "ERROR"), HttpStatus.BAD_REQUEST);
	}

	@RequestMapping(value = "/license/extend/{days}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SucessMessage> updateLicenseLicense(@PathVariable String days,
			@RequestBody LicenseDetails license) throws Exception {
		LoginDetails loginDetail = licenseSecurityUtils.getUserFromSecurityContext();
		if (null != loginDetail) {
			LicenseDetails fetchLicensed = licenseDetailRepo.findByHostName(license.getHostName());
			if (null != fetchLicensed) {
				Integer vlidateDays = fetchLicensed.getValidityDay() + Integer.parseInt(days);
				fetchLicensed.setValidityDay(vlidateDays);
				fetchLicensed.setStatus("ACTIVE");
				licenseDetailRepo.save(fetchLicensed);
				licenseBuildUtil.generateLicenseFile(fetchLicensed);
				return new ResponseEntity<SucessMessage>(
						new SucessMessage(schoolDateUtils.currentDate(), "Sucess Fully Registered", "SUCESS"),
						HttpStatus.OK);
			} else {
				return new ResponseEntity<SucessMessage>(
						new SucessMessage(schoolDateUtils.currentDate(), "Licese exist for Host Name", "LICENSE_EXIST"),
						HttpStatus.BAD_REQUEST);
			}
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

	@RequestMapping(value = "/license/{hostname}", method = RequestMethod.GET)
	public ResponseEntity<LicenseDetails> findLicenseByHostName(@PathVariable String hostname) {
		return new ResponseEntity<LicenseDetails>(licenseDetailRepo.findByHostName(hostname), HttpStatus.OK);
	}

	@RequestMapping(value = "/licenseKey/{hostname}", method = RequestMethod.GET)
	public ResponseEntity<LicenseKey> findLicenseKeyByHostName(@PathVariable String hostname) {
		return new ResponseEntity<LicenseKey>(licenseKeyRepo.findByHostName(hostname), HttpStatus.OK);
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
