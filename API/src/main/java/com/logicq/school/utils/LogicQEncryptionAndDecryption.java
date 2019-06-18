package com.logicq.school.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class LogicQEncryptionAndDecryption {

	static Logger LOG = LoggerFactory.getLogger(LogicQEncryptionAndDecryption.class);

	private static SecretKeySpec secretKey;
	private static byte[] key;

	private static void setKey(String myKey) {
		try {
			if (null == secretKey) {
				key = myKey.getBytes("UTF-8");
				MessageDigest sha = MessageDigest.getInstance("SHA-1");
				key = sha.digest(key);
				key = Arrays.copyOf(key, 16);
				secretKey = new SecretKeySpec(key, "AES");
			}
		} catch (NoSuchAlgorithmException ex) {
			LOG.error("Error while Building key : " + ex);
		} catch (UnsupportedEncodingException ex) {
			LOG.error("Error while Building key : " + ex);
		}
	}

	private static void encryptFile(byte[] dataToEncrypt, File outputFile, String secret) {
		try {
			setKey(secret);
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
			byte[] encryptedData = cipher.doFinal(dataToEncrypt);
			FileOutputStream outputStream = new FileOutputStream(outputFile);
			outputStream.write(encryptedData);
			outputStream.close();
		} catch (Exception ex) {
			LOG.error("Error while encrypting: " + ex);
		}
		return;

	}

	private static File changeExtension(File f, String newExtension) {
		int i = f.getName().lastIndexOf('.');
		String name = f.getName().substring(0, i);
		return new File(f.getParent() + "/" + name + "." + newExtension);
	}

	public static void findFilesInFolderAndEncrypt(File folder, String key) throws Exception {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isDirectory()) {
				findFilesInFolderAndEncrypt(fileEntry, key);
			} else {
				if (fileEntry.isFile()) {
					File new_file = changeExtension(fileEntry, "lq");
					readFileAndEncryptFile(fileEntry, new_file, key);
				}
			}
		}
	}

	private static void readFileAndEncryptFile(File fileToBeEncrypted, File outputFile, String key) throws IOException {
		FileInputStream fis = new FileInputStream(fileToBeEncrypted);
		byte[] fbytes = new byte[(int) fileToBeEncrypted.length()];
		fis.read(fbytes);
		fis.close();
		encryptFile(fbytes, outputFile, key);
	}

	public static String decrypt(String strToDecrypt, String secret) {
		try {
			setKey(secret);
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey);
			return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
		} catch (Exception ex) {
			LOG.error(" Unable to decrypt : " + ex.getMessage());
		}
		return null;
	}

	public byte[] readFileAndDecryptFile(File fileToBeDecrypt, String key) throws IOException {
		FileInputStream fis = new FileInputStream(fileToBeDecrypt);
		byte[] fbytes = new byte[(int) fileToBeDecrypt.length()];
		fis.read(fbytes);
		fis.close();
		return decryptFile(fbytes, key);
	}

	private byte[] decryptFile(byte[] dataToDecrypt, String secret) {
		try {
			setKey(secret);
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey);

			return cipher.doFinal(dataToDecrypt);
		} catch (Exception ex) {
			LOG.error(" Unable to decrypt : " + ex.getMessage());
		}
		return null;
	}

	public static String encrypt(String strToEncrypt, String secret) {
		try {
			setKey(secret);
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey);
			return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes("UTF-8")));
		} catch (Exception ex) {
			System.out.println("Error while encrypt: " + ex);
		}
		return null;
	}

}
