package com.logicq.encryption;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.Key;
import java.util.Scanner;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class VideoFileEncryption {

	private static final String ALGORITHM = "AES";
	private static final String TRANSFORMATION = "AES";

	public static void main(String[] args) throws Exception {
		Scanner scanner = new Scanner(System.in);
		System.out.println(" Enter video File Folder: ");
		String videoFileFolder = scanner.nextLine();
		System.out.println(" Enter Encrypted File to be Store Folder: ");
		String outputfolder = scanner.nextLine();
		File outputFoler = new File(outputfolder);
		SchoolSecurityUtils securityUtil = new SchoolSecurityUtils();

		String decryptedkey = securityUtil.decryptText(securityUtil.readFileLine("license.key"),
				securityUtil.getPublic("KeyPair/publicKey"));

		Key secretKey = new SecretKeySpec(decryptedkey.getBytes(), ALGORITHM);
		Cipher cipher = Cipher.getInstance(TRANSFORMATION);
		cipher.init(Cipher.ENCRYPT_MODE, secretKey);
		// Need to read license encrypted text and decrypt the license AND pass license
		// key to decrypt it.
		findFilesInFolderAndEncrypt(cipher, securityUtil, new File(videoFileFolder), outputFoler);
	}

	private static void findFilesInFolderAndEncrypt(Cipher cipher, SchoolSecurityUtils securityUtil, File folder,
			File outputFoler) throws Exception {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isDirectory()) {
				findFilesInFolderAndEncrypt(cipher, securityUtil, fileEntry, outputFoler);
			} else {
				if (fileEntry.isFile()) {
					File new_file = changeExtension(fileEntry, "lq");
					doEncrypt(cipher, securityUtil, fileEntry, new_file);
				}
			}
		}
	}

	private static void doEncrypt(Cipher cipher, SchoolSecurityUtils securityUtil, File fileEntry, File outputFile)
			throws Exception {
		try {
			FileInputStream inputStream = new FileInputStream(fileEntry);
			byte[] inputBytes = new byte[(int) fileEntry.length()];
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

	public static File changeExtension(File f, String newExtension) {
		int i = f.getName().lastIndexOf('.');
		String name = f.getName().substring(0, i);
		return new File(f.getParent() + "/" + name + "." + newExtension);
	}

}
