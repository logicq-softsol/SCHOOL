package com.logicq.school.utils;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.logicq.school.vo.LicenseDetails;

@Component
public class SchoolRestClient {

	@Autowired
	Environment env;

	@Autowired
	LogicQEncryptionAndDecryption logicQEncryptionAndDecryption;

	public LicenseDetails validateLicense(String hostName) throws Exception {
		File file = ResourceUtils.getFile("classpath:" + hostName + ".lq");
		byte[] data = logicQEncryptionAndDecryption.readFileAndDecryptFile(file, env.getProperty("school.key"));
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
		return objectMapper.readValue(data, LicenseDetails.class);
	}

}
