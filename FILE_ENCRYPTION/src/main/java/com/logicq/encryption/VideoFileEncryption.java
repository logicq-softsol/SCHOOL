package com.logicq.encryption;

import java.io.File;
import java.security.Security;
import java.util.Scanner;

import com.logicq.encryption.model.LicenseDetails;
import com.logicq.encryption.model.LicenseKey;
import com.logicq.encryption.util.LogicQEncryptionAndDecryption;

public class VideoFileEncryption {

	public static void main(String[] args) throws Exception {
		Scanner scanner = new Scanner(System.in);
		System.out.println(" Enter HostName For Which Want to Encrypt : ");
		String hostName = scanner.nextLine();
		EncryptionRestClient encryptionRestCLient = new EncryptionRestClient();
		LicenseDetails licenseDetails = encryptionRestCLient.getLicenseForHostName(hostName);
		LicenseKey licenseKey = encryptionRestCLient.getLicenseKeyForHostName(hostName);
		String licensekey = LogicQEncryptionAndDecryption.decrypt(licenseDetails.getLicenseKey(),
				licenseKey.getHostKey(), licenseKey.getHostKeySalt());
		System.out.println(licensekey);
		System.out.println(" Enter video File Folder: ");
		String videoFileFolder = scanner.nextLine();
		File outputFoler = new File(videoFileFolder);

		LogicQEncryptionAndDecryption.findFilesInFolderAndEncrypt(outputFoler, licensekey, licenseKey.getHostKeySalt());

		System.out.println(" We Are done. Good to go ############## LogicQ SoftSol Private Limited.");
	}

}
