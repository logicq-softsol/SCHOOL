package com.logicq.school;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

public class DemoEncryption {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(" Encryption Start : " + System.currentTimeMillis());
		encrypt("demodemodemodem0", new File("C:\\Users\\sudhanshu\\Desktop\\film\\test.mp4"),
				new File("C:\\Users\\sudhanshu\\Desktop\\film\\movi_enc.lq"));
		System.out.println(" Encryption End : " + System.currentTimeMillis());
		System.out.println(" Decrypt Start : " + System.currentTimeMillis());
		decrypt("demodemodemodem0", new File("C:\\Users\\sudhanshu\\Desktop\\film\\movi_enc.lq"),
				new File("C:\\Users\\sudhanshu\\Desktop\\film\\movi_enc.mp4"));
		System.out.println(" Decrypt End : " + System.currentTimeMillis());
	}

	private static final String ALGORITHM = "AES";
	private static final String TRANSFORMATION = "AES";

	public static void encrypt(String key, File inputFile, File outputFile) {
		doCrypto(Cipher.ENCRYPT_MODE, key, inputFile, outputFile);
	}

	public static void decrypt(String key, File inputFile, File outputFile) {
		doCrypto(Cipher.DECRYPT_MODE, key, inputFile, outputFile);
	}

	private static void doCrypto(int cipherMode, String key, File inputFile, File outputFile) {
		try {
			Key secretKey = new SecretKeySpec(key.getBytes(), ALGORITHM);
			Cipher cipher = Cipher.getInstance(TRANSFORMATION);
			cipher.init(cipherMode, secretKey);

			/* String inputFile = "D:\\ajay\\VID\\test.mp4"; */
			/* String outputFile = "D:\\ajay\\VID\\test22.mp4"; */
			FileInputStream inputStream = new FileInputStream(inputFile);
			byte[] inputBytes = new byte[(int) inputFile.length()];
			inputStream.read(inputBytes);

			byte[] outputBytes = cipher.doFinal(inputBytes);

			FileOutputStream outputStream = new FileOutputStream(outputFile);
			outputStream.write(outputBytes);

			inputStream.close();
			outputStream.close();

		} catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeyException | BadPaddingException
				| IllegalBlockSizeException | IOException ex) {
			ex.printStackTrace();
		}
	}
}
