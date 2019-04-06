package com.logicq.license.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

public class TestEncryptionAndDecryption {

	private static String secretKey = "boooooooooom!!!!";
	private static String salt = "ssshhhhhhhhhhh!!!!";

	public static void encryptFile(byte[] dataToEncrypt, File outputFile) {
		try {
			byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
			IvParameterSpec ivspec = new IvParameterSpec(iv);

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(secretKey.toCharArray(), salt.getBytes(), 65536, 256);
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

	public static void decryptFile(byte[] dataToDecrypt, File outputFile) {
		try {
			byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
			IvParameterSpec ivspec = new IvParameterSpec(iv);

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(secretKey.toCharArray(), salt.getBytes(), 65536, 256);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
			byte[] decrptedData = cipher.doFinal(dataToDecrypt);
			FileOutputStream outputStream = new FileOutputStream(outputFile);
			outputStream.write(decrptedData);
			outputStream.close();
		} catch (Exception e) {
			System.out.println("Error while decrypting: " + e.toString());
		}

	}

	public static File changeExtension(File f, String newExtension) {
		int i = f.getName().lastIndexOf('.');
		String name = f.getName().substring(0, i);
		return new File(f.getParent() + "/" + name + "." + newExtension);
	}

	private static void findFilesInFolderAndEncrypt(File folder) throws Exception {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isDirectory()) {
				findFilesInFolderAndEncrypt(fileEntry);
			} else {
				if (fileEntry.isFile()) {
					File new_file = changeExtension(fileEntry, "lq");
					readFileAndEncryptFile(fileEntry, new_file);
				}
			}
		}
	}

	private static void findFilesInFolderAndDecrypt(File folder) throws Exception {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isDirectory()) {
				findFilesInFolderAndEncrypt(fileEntry);
			} else {
				if (fileEntry.isFile()) {
					File new_file = changeExtension(fileEntry, "mp4");
					readFileAndDecryptFile(fileEntry, new_file);
				}
			}
		}
	}

	public static void readFileAndEncryptFile(File fileToBeEncrypted, File outputFile) throws IOException {
		FileInputStream fis = new FileInputStream(fileToBeEncrypted);
		byte[] fbytes = new byte[(int) fileToBeEncrypted.length()];
		fis.read(fbytes);
		fis.close();
		encryptFile(fbytes, outputFile);
	}

	public static void readFileAndDecryptFile(File fileToBeEncrypted, File outputFile) throws IOException {
		FileInputStream fis = new FileInputStream(fileToBeEncrypted);
		byte[] fbytes = new byte[(int) fileToBeEncrypted.length()];
		fis.read(fbytes);
		fis.close();
		decryptFile(fbytes, outputFile);
	}

	public static void main(String[] args) throws Exception {
		findFilesInFolderAndDecrypt(new File("E:\\WORK_SPACE\\SCHOOL_CONTENT\\video\\EncryptedContent"));
	}

}
