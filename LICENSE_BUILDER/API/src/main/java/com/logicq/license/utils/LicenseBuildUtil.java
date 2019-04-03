package com.logicq.license.utils;

import java.io.FileOutputStream;
import java.security.PrivateKey;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.logicq.license.model.LicenseDetails;

@Component
public class LicenseBuildUtil {

	private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private final static Random rng = new SecureRandom();

	@Autowired
	LicenseSecurityUtils licenseSecurityUtils;

	@Autowired
	Environment env;

	static char randomChar() {
		return ALPHABET.charAt(rng.nextInt(ALPHABET.length()));
	}

	private String buildKey(LicenseDetails licenseDetail) {
		StringBuilder sb = new StringBuilder();
		if (!StringUtils.isEmpty(licenseDetail.getHostName())) {
			if (licenseDetail.getHostName().length() >= 4) {
				String generateHostKey = String.format("%04d", rng.nextInt(10000));
				sb.append(generateHostKey);
				sb.append("-");
			}
		}

		if (!StringUtils.isEmpty(licenseDetail.getProductName())) {
			if (licenseDetail.getProductName().length() >= 4) {
				String generateProductKey = String.format("%04d", rng.nextInt(100000));
				sb.append(generateProductKey);
				sb.append("-");
			}
		}
		if (licenseDetail.getValidityDay() > 0000) {
			String generateVaidityKey = String.format("%04d", rng.nextInt(10000));
			sb.append(generateVaidityKey);
			sb.append("-");
			String generateKey = String.format("%04d", rng.nextInt(100000));
			sb.append(generateKey);
		}

		return sb.toString();
	}

	public String buildproductKey(LicenseDetails licenseDetail) throws Exception {
		GenerateKeys gk = new GenerateKeys(1024);
		gk.createKeys();
		gk.writeToFile(env.getProperty("license.path") + licenseDetail.getHostName() + "/KeyPair/publicKey",
				gk.getPublicKey().getEncoded());
		gk.writeToFile(env.getProperty("license.path")+ licenseDetail.getHostName() + "/KeyPair/privateKey",
				gk.getPrivateKey().getEncoded());
		licenseDetail.setPrivateKey(Base64.getEncoder().encodeToString(gk.getPrivateKey().getEncoded()));
		String licenseKey = buildKey(licenseDetail);
		licenseDetail.setLicenseKey(licenseKey);
		generateLicenseFile(licenseKey, licenseDetail.getHostName());
		return licenseKey;

	}

	private void generateLicenseFile(String key, String hostName) {
		try {
			FileOutputStream plainStream = new FileOutputStream(
					env.getProperty("license.path")+ hostName + "/license.txt");
			plainStream.write(key.getBytes());
			plainStream.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
