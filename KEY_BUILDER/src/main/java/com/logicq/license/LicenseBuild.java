package com.logicq.license;

import java.io.FileOutputStream;
import java.io.IOException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Random;

import javax.crypto.Cipher;

public class LicenseBuild {

	private static final String ALGORITHM = "RSA";
	private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private final static Random rng = new SecureRandom();
	private static Cipher cipher;

	public static void main(String[] args) throws Exception {

		GenerateKeys gk = new GenerateKeys(1024);
		gk.createKeys();
		gk.writeToFile("KeyPair/publicKey", gk.getPublicKey().getEncoded());
		gk.writeToFile("KeyPair/privateKey", gk.getPrivateKey().getEncoded());
		buildproductKey(gk.getPrivateKey());

	}

	static char randomChar() {
		return ALPHABET.charAt(rng.nextInt(ALPHABET.length()));
	}

	private static String randomUUID(int length, int spacing, char spacerChar) {
		StringBuilder sb = new StringBuilder();
		int spacer = 0;
		while (length > 0) {
			if (spacer == spacing) {
				sb.append(spacerChar);
				spacer = 0;
			}
			length--;
			spacer++;
			sb.append(randomChar());
		}
		return sb.toString();
	}

	public static void buildproductKey(PrivateKey key) throws Exception {
		String licenseKey = randomUUID(16, 4, '-');
		System.out.println("printable License key :" + licenseKey);
		encryptText(licenseKey, key);

	}

	public static void encryptText(String plainText, PrivateKey privateKey) throws Exception {
		String orignalKey = plainText.replaceAll("-", "");
		SchoolSecurityUtils securityUtil = new SchoolSecurityUtils();
		String encryptedText = securityUtil.encryptText(orignalKey, privateKey);
		generateLicenseFileAndEncrypt(encryptedText);
	}

	private static void generateLicenseFileAndEncrypt(String encryptedText) {
		try {
			FileOutputStream outputStream = new FileOutputStream("license.txt");
			outputStream.write(encryptedText.getBytes());
			outputStream.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
