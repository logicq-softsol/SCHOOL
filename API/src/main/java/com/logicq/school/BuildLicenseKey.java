package com.logicq.school;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.Scanner;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.commons.text.CharacterPredicates;
import org.apache.commons.text.RandomStringGenerator;

public class BuildLicenseKey {
	private static final String UNICODE_FORMAT = "UTF8";
	public static final String DESEDE_ENCRYPTION_SCHEME = "DESede";
	private static KeySpec ks;
	private static SecretKeyFactory skf;
	private static Cipher cipher;
	static byte[] arrayBytes;
	private static String myEncryptionKey;
	private static String myEncryptionScheme;
	static SecretKey key;

	public static void main(String args[]) throws Exception {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter Machine Name:");
		String hostname = scanner.nextLine();
		// scanner.nextLine(); // This is needed to pick up the new line
		System.out.println("Enter License Validity in Days:");
		int interval = scanner.nextInt();
		// System.out.println("Enter Key:");
		// String key = scanner.nextLine();
		scanner.nextLine();
//		RandomStringGenerator randomStringGenerator = new RandomStringGenerator.Builder().withinRange('0', 'z')
//				.filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS).build();
		String randomKey ="";// randomStringGenerator.generate(10);
		String last4digitHostname = hostname.substring(hostname.length() - 4);
		StringBuilder buildLicenseKey = new StringBuilder().append(randomKey.toUpperCase()).append(last4digitHostname)
				.append(String.valueOf(interval));
		System.out.println("Your License Key : " +buildLicenseKey );
		String key=encrypt(buildLicenseKey.toString());
		System.out.println("Your License Key En: " +key );
		System.out.println("Your License Key De: " +	decrypt(key) );
	}

	public static String encrypt(String unencryptedString) throws Exception {
		myEncryptionKey = "ThisIsSpartaThisIsSparta";
		myEncryptionScheme = DESEDE_ENCRYPTION_SCHEME;
		arrayBytes = myEncryptionKey.getBytes(UNICODE_FORMAT);
		ks = new DESedeKeySpec(arrayBytes);
		skf = SecretKeyFactory.getInstance(myEncryptionScheme);
		cipher = Cipher.getInstance(myEncryptionScheme);
		key = skf.generateSecret(ks);

		String encryptedString = null;
		try {
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] plainText = unencryptedString.getBytes(UNICODE_FORMAT);
			byte[] encryptedText = cipher.doFinal(plainText);
			encryptedString = new String(Base64.getEncoder().encode(encryptedText));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return encryptedString;
	}

	public static String decrypt(String encryptedString) {
		String decryptedText = null;
		try {
			cipher.init(Cipher.DECRYPT_MODE, key);
			byte[] encryptedText = Base64.getDecoder().decode(encryptedString);
			byte[] plainText = cipher.doFinal(encryptedText);
			decryptedText = new String(plainText);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return decryptedText;
	}

}
