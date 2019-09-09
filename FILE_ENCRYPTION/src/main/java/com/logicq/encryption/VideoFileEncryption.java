package com.logicq.encryption;

import java.io.File;
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
		if (null != licenseDetails) {
			LicenseKey licenseKey = encryptionRestCLient.getLicenseKeyForHostName(hostName);
			String licensekey = LogicQEncryptionAndDecryption.decrypt(licenseDetails.getLicenseKey(),
					licenseKey.getKey());
			System.out.println(" License key for Host Name  " + hostName + " is : " + licensekey);
			System.out.println("Do You Want to Encrypt Video File (Y/N) ?");
			String encryptDecision = scanner.nextLine();
			if ("Y".equalsIgnoreCase(encryptDecision)) {
				System.out.println("Enter Folder You Want to Encrypt :");
				String videoFileFolder = scanner.nextLine();
				File outputFoler = new File(videoFileFolder);
				LogicQEncryptionAndDecryption.findFilesInFolderAndEncrypt(outputFoler, licenseKey.getKey());
				System.out.println(" We Are done. Good to go ############## LogicQ SoftSol Private Limited.");
			} else {
				System.exit(0);
			}
		} else {
			System.out.println(" Missing license : ############## LogicQ SoftSol Private Limited.");
			System.exit(0);
		}

	}
	



}
