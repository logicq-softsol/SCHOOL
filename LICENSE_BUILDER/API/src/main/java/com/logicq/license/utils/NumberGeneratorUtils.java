package com.logicq.license.utils;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class NumberGeneratorUtils {

	@Autowired
	Environment env;

	public String generateSalt() {
		return RandomStringUtils.randomAlphanumeric(8);
	}

	public String generateKey() {
		return RandomStringUtils.randomAlphanumeric(8);
	}

	public String generateBuildKey() {
		return RandomStringUtils.randomAlphanumeric(4);
	}

	public String generateTableCode() {
		return RandomStringUtils.randomAlphabetic(4).toUpperCase();
	}

}
