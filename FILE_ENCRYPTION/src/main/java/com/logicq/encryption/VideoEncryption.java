package com.logicq.encryption;

import java.io.File;
import java.util.Scanner;

import com.logicq.encryption.util.LogicQEncryptionAndDecryption;

public class VideoEncryption {

	public static void main(String[] args) throws Exception {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Do You Want to Encrypt Video File (Y/N) ?");
		String encryptDecision = scanner.nextLine();
		if ("Y".equalsIgnoreCase(encryptDecision)) {
			System.out.println("Enter Folder You Want to Encrypt :");
			String videoFileFolder = scanner.nextLine();
			File outputFoler = new File(videoFileFolder);
			LogicQEncryptionAndDecryption.findFilesInFolderAndEncrypt(outputFoler, "7?jUQ_-U&U4na:yT");
			System.out.println(" We Are done. Good to go ############## LogicQ SoftSol Private Limited.");
		} else {
			System.exit(0);
		}
	}

}
