package com.logicq.school.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.logicq.school.vo.LicenseDetails;

@Component
public class SchoolRestClient {

	public ResponseEntity<LicenseDetails> validateLicense(String hostName) {
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForEntity("http://127.0.0.1:8080/api/school/license/" + hostName, LicenseDetails.class);
	}

}
