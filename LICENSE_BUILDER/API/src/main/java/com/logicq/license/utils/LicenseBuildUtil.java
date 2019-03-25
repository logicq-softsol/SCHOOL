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
		gk.writeToFile(licenseDetail.getHostName() + "/KeyPair/publicKey", gk.getPublicKey().getEncoded());
		gk.writeToFile(licenseDetail.getHostName() + "/KeyPair/privateKey", gk.getPrivateKey().getEncoded());
		String licenseKey = buildKey(licenseDetail);
		return encryptText(licenseKey, gk.getPrivateKey(), licenseDetail.getHostName());

	}

	public String encryptText(String plainText, PrivateKey privateKey, String hostName) throws Exception {
		String orignalKey = plainText.replaceAll("-", "");
		String encryptedText = licenseSecurityUtils.encryptText(orignalKey, privateKey);
		generateLicenseFileAndEncrypt(encryptedText, plainText, hostName);
		return encryptedText;
	}

	private void generateLicenseFileAndEncrypt(String encryptedText, String plainText, String hostName) {
		try {
			FileOutputStream outputStream = new FileOutputStream(hostName + "/license.key");
			outputStream.write(encryptedText.getBytes());
			outputStream.close();

			FileOutputStream plainStream = new FileOutputStream(hostName +"/license.txt");
			plainStream.write(plainText.getBytes());
			plainStream.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
