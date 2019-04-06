package com.logicq.school.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.logicq.school.vo.ActivateKey;
import com.logicq.school.vo.LicenseDetails;

@Component
public class SchoolRestClient {

	@Autowired
	Environment env;

	public ResponseEntity<LicenseDetails> validateLicense(String hostName) {
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForEntity(env.getProperty("school.client.uri") + hostName, LicenseDetails.class);
	}

	public ResponseEntity<ActivateKey> getLicenseKey(String hostName) {
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForEntity(env.getProperty("school.client.uri.license") + hostName, ActivateKey.class);
	}

}
