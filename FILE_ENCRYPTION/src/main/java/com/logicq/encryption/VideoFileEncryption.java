package com.logicq.encryption;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Scanner;

import javax.crypto.Cipher;

public class VideoFileEncryption {

	public static void main(String[] args) throws Exception {

		Scanner scanner = new Scanner(System.in);
		System.out.println(" Enter HostName For Which Want to Encrypt : ");
		String hostName = scanner.nextLine();
		EncryptionRestClient encryptionRestCLient = new EncryptionRestClient();
		LicenseDetails licenseDetails = encryptionRestCLient.validateLicenseForHostName(hostName);

		System.out.println(" Enter video File Folder: ");
		String videoFileFolder = scanner.nextLine();
		File outputFoler = new File(videoFileFolder);

		SchoolSecurityUtils securityUtil = new SchoolSecurityUtils();
		PrivateKey key = securityUtil.getPrivate(licenseDetails);

		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		// Need to read license encrypted text and decrypt the license AND pass license
		// key to decrypt it.
		findFilesInFolderAndEncrypt(cipher, securityUtil, new File(videoFileFolder), outputFoler);

		System.out.println(" We Are done. Good to go ############## LogicQ SoftSol Private Limited.");
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
