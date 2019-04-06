package com.logicq.license.utils;

import java.io.FileOutputStream;
import java.security.SecureRandom;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.logicq.license.model.LicenseDetails;
import com.logicq.license.model.LicenseKey;
import com.logicq.license.repository.LicenseKeyRepo;

@Component
public class LicenseBuildUtil {

	@Autowired
	LicenseSecurityUtils licenseSecurityUtils;

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
		String licenseText = licenseSecurityUtils.encryptText(licenseKey, secretkey);
		licenseDetail.setLicenseKey(licenseText);
		generateLicenseFile(licenseKey, licenseDetail.getHostName());
		return licenseKey;

	}

	private LicenseKey buildSecretKey(LicenseDetails licenseDetail) {
		LicenseKey secretkey = licenseKeyRepo.findByHostName(licenseDetail.getHostName());
		if (null == secretkey) {
			secretkey = new LicenseKey();
			secretkey.setHostName(licenseDetail.getHostName());
			secretkey.setHostKeySalt(numberGeneratorUtils.generateSalt());
			secretkey.setHostKey(numberGeneratorUtils.generateKey());
			licenseKeyRepo.save(secretkey);
		}

		return secretkey;
	}

	private void generateLicenseFile(String key, String hostName) {
		try {
			FileOutputStream plainStream = new FileOutputStream(
					env.getProperty("license.path") + hostName + "/license.txt");
			plainStream.write(key.getBytes());
			plainStream.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
