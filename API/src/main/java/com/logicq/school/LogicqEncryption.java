package com.logicq.school;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.InetAddress;
import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class LogicqEncryption {

	private static final String ALGORITHM = "AES";
	private static final String TRANSFORMATION = "AES";

	public static void main(String[] args) throws Exception {
		String hostName = InetAddress.getLocalHost().getHostName();
		String key = "demodemodemodem0";
		Key secretKey = new SecretKeySpec(key.getBytes(), ALGORITHM);
		Cipher cipher = Cipher.getInstance(TRANSFORMATION);
		cipher.init(Cipher.ENCRYPT_MODE, secretKey);
		final File folder = new File("E:\\WORK_SPACE\\SCHOOL_CONTENT\\video\\SampleContent");
		listFilesForFolder(cipher, folder);

	}

	public static void encrypt(Cipher cipher, File inputFile, File outputFile) {
		doCrypto(cipher, inputFile, outputFile);
	}

	private static void doCrypto(Cipher cipher, File inputFile, File outputFile) {
		try {
			FileInputStream inputStream = new FileInputStream(inputFile);
			byte[] inputBytes = new byte[(int) inputFile.length()];
			inputStream.read(inputBytes);

			byte[] outputBytes = cipher.doFinal(inputBytes);

			FileOutputStream outputStream = new FileOutputStream(outputFile);
			outputStream.write(outputBytes);
			inputStream.close();
			outputStream.close();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void listFilesForFolder(Cipher cipher, final File folder) {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isDirectory()) {
				listFilesForFolder(cipher, fileEntry);
			} else {
				if (fileEntry.isFile()) {
					File new_file = changeExtension(fileEntry, "lq");
					encrypt(cipher, fileEntry, new_file);
				}
			}
		}
	}

	public static File changeExtension(File f, String newExtension) {
		int i = f.getName().lastIndexOf('.');
		String name = f.getName().substring(0, i);
		return new File(f.getParent() + "/" + name + "." + newExtension);
	}

}
