package com.logicq.encryption.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import com.logicq.encryption.model.LicenseKey;

public class LogicQEncryptionAndDecryption {

	private static void encryptFile(byte[] dataToEncrypt, File outputFile, String key, String salt) {
		try {
			byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
			IvParameterSpec ivspec = new IvParameterSpec(iv);

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(key.toCharArray(), salt.getBytes(), 65536, 256);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivspec);
			byte[] encryptedData = cipher.doFinal(dataToEncrypt);
			FileOutputStream outputStream = new FileOutputStream(outputFile);
			outputStream.write(encryptedData);
			outputStream.close();
		} catch (Exception e) {
			System.out.println("Error while encrypting: " + e.toString());
		}

	}

	private static File changeExtension(File f, String newExtension) {
		int i = f.getName().lastIndexOf('.');
		String name = f.getName().substring(0, i);
		return new File(f.getParent() + "/" + name + "." + newExtension);
	}

	public static void findFilesInFolderAndEncrypt(File folder, String key, String salt) throws Exception {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isDirectory()) {
				findFilesInFolderAndEncrypt(fileEntry, key, salt);
			} else {
				if (fileEntry.isFile()) {
					File new_file = changeExtension(fileEntry, "lq");
					readFileAndEncryptFile(fileEntry, new_file, key, salt);
				}
			}
		}
	}

	private static void readFileAndEncryptFile(File fileToBeEncrypted, File outputFile, String key, String salt)
			throws IOException {
		FileInputStream fis = new FileInputStream(fileToBeEncrypted);
		byte[] fbytes = new byte[(int) fileToBeEncrypted.length()];
		fis.read(fbytes);
		fis.close();
		encryptFile(fbytes, outputFile, key, salt);
	}

	public static String decrypt(String strToDecrypt, String key, String salt) {
		try {
			byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
			IvParameterSpec ivspec = new IvParameterSpec(iv);

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(key.toCharArray(), salt.getBytes(), 65536, 256);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
			return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
		} catch (Exception ex) {
			System.out.println("Error while decrypting: " + ex.toString());
		}
		return null;
	}

}
