package com.logicq.license.utils;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class NumberGeneratorUtils {

	@Autowired
	Environment env;

	public String generateHostId() {
		return RandomStringUtils.randomAlphabetic(4).toUpperCase();
	}

	public String generateBillId() {
		return RandomStringUtils.randomAlphabetic(8);
	}

	public String generateTableCode() {
		return RandomStringUtils.randomAlphabetic(4).toUpperCase();
	}

}
