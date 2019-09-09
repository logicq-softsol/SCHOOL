package com.logicq.license.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.logicq.license.model.LicenseDetails;
import com.logicq.license.model.LicenseKey;
import com.logicq.license.repository.LicenseKeyRepo;

@Component
public class LicenseBuildUtil {

	@Autowired
	LicenseSecurityUtils licenseSecurityUtils;

	@Autowired
	LogicQEncryptionAndDecryption logicQEncryptionAndDecryption;

	@Autowired
	LicenseKeyRepo licenseKeyRepo;

	@Autowired
	NumberGeneratorUtils numberGeneratorUtils;

	@Autowired
	Environment env;

	private String buildKey(LicenseDetails licenseDetail) {
		StringBuilder sb = new StringBuilder();
		if (!StringUtils.isEmpty(licenseDetail.getHostName())) {
			if (licenseDetail.getHostName().length() >= 4) {
				sb.append(numberGeneratorUtils.generateBuildKey());
				sb.append("-");
			}
		}

		if (!StringUtils.isEmpty(licenseDetail.getProductName())) {
			if (licenseDetail.getProductName().length() >= 4) {
				sb.append(numberGeneratorUtils.generateBuildKey());
				sb.append("-");
			}
		}
		if (licenseDetail.getValidityDay() > 0000) {

			sb.append(numberGeneratorUtils.generateBuildKey());
			sb.append("-");
			sb.append(numberGeneratorUtils.generateBuildKey());
		}

		return sb.toString();
	}

	public String buildproductKey(LicenseDetails licenseDetail) throws Exception {
		String licenseKey = buildKey(licenseDetail);
		LicenseKey secretkey = buildSecretKey(licenseDetail);
		return logicQEncryptionAndDecryption.encrypt(licenseKey, secretkey.getKey());

	}

	private LicenseKey buildSecretKey(LicenseDetails licenseDetail) {
		LicenseKey secretkey = licenseKeyRepo.findByHostName(licenseDetail.getHostName());
		if (null == secretkey) {
			secretkey = new LicenseKey();
			secretkey.setHostName(licenseDetail.getHostName());
			secretkey.setKey(numberGeneratorUtils.getEduSureKey());
			licenseKeyRepo.save(secretkey);
		}

		return secretkey;
	}

	public void generateLicenseFile(LicenseDetails license) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
			String directoryPath = env.getProperty("license.path") + "//" + license.getEntityName();
			String licensePath = directoryPath + "//" + license.getHostName() + ".json";
			// File createdLicenseFile = ;
			File directory = new File(directoryPath);
			if (!directory.exists()) {
				directory.mkdir();
			}
			File jsonFile = new File(licensePath);
			objectMapper.writeValue(jsonFile, license);
			File new_file = LogicQEncryptionAndDecryption.changeExtension(new File(licensePath), "lq");
			String key = env.getProperty("school.key");
			LogicQEncryptionAndDecryption.readFileAndEncryptFile(new File(licensePath), new_file, key);
			jsonFile.delete();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
