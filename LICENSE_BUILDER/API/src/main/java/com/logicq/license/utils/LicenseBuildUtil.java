package com.logicq.license.utils;

import java.io.FileOutputStream;
import java.security.PrivateKey;
import java.security.SecureRandom;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.logicq.license.model.LicenseDetails;

@Component
public class LicenseBuildUtil {

	private static final String ALGORITHM = "RSA";
	private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private final static Random rng = new SecureRandom();

	@Autowired
	LicenseSecurityUtils licenseSecurityUtils;

	static char randomChar() {
		return ALPHABET.charAt(rng.nextInt(ALPHABET.length()));
	}

	private String buildKey(LicenseDetails licenseDetail) {
		StringBuilder sb = new StringBuilder();
		if (!StringUtils.isEmpty(licenseDetail.getHostName())) {
			if (licenseDetail.getHostName().length() >= 4) {
				String hostName = licenseDetail.getHostName().substring(licenseDetail.getHostName().length() - 4);
				sb.append(hostName);
				sb.append("-");
			}
		}

		if (!StringUtils.isEmpty(licenseDetail.getProductName())) {
			if (licenseDetail.getProductName().length() >= 4) {
				String productName = licenseDetail.getProductName()
						.substring(licenseDetail.getProductName().length() - 4);
				sb.append(productName);
				sb.append("-");
			}
		}
		if (licenseDetail.getValidityDay() > 0000) {
			String validityDay = "0000" + licenseDetail.getValidityDay();
			String day = validityDay.substring(validityDay.length() - 4);
			sb.append(day);
			sb.append("-");
			String generateKey = String.format("%04d", rng.nextInt(10000));
			sb.append(generateKey);
		}

		return sb.toString();
	}

	public String buildproductKey(LicenseDetails licenseDetail) throws Exception {
		GenerateKeys gk = new GenerateKeys(1024);
		gk.createKeys();
		gk.writeToFile("KeyPair/publicKey", gk.getPublicKey().getEncoded());
		gk.writeToFile("KeyPair/privateKey", gk.getPrivateKey().getEncoded());
		String licenseKey = buildKey(licenseDetail);
		return encryptText(licenseKey, gk.getPrivateKey());

	}

	public String encryptText(String plainText, PrivateKey privateKey) throws Exception {
		String orignalKey = plainText.replaceAll("-", "");
		String encryptedText = licenseSecurityUtils.encryptText(orignalKey, privateKey);
		generateLicenseFileAndEncrypt(plainText);
		return encryptedText;
	}

	private void generateLicenseFileAndEncrypt(String plainText) {
		try {
			FileOutputStream outputStream = new FileOutputStream("license.txt");
			outputStream.write(plainText.getBytes());
			outputStream.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
