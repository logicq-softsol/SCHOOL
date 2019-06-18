package com.logicq.ecryption;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Scanner;

import com.logicq.encryption.util.LogicQEncryptionAndDecryption;

public class TestEncryption {

	public static void testEncryption() throws Exception {
		Scanner scanner = new Scanner(System.in);
		System.out.println(" Enter Folder For Which Want to Encrypt : ");
		String folder = scanner.nextLine();
		LogicQEncryptionAndDecryption.findFilesInFolderAndEncrypt(new File(folder), "7?jUQ_-U&U4na:yT");
	}

	public static void main(String[] args) throws Exception {
		// testEncryption();
		testDecryption();
	}

	private static void generateFile(byte[] data, File file) {
		try {
			FileOutputStream plainStream = new FileOutputStream(file);
			plainStream.write(data);
			plainStream.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void testDecryption() throws Exception {
		Scanner scanner = new Scanner(System.in);
		System.out.println(" Enter Folder For Which Want to Encrypt : ");
		String folder = scanner.nextLine();
		byte[] data = LogicQEncryptionAndDecryption.readFileAndDecryptFile(new File(folder), "7?jUQ_-U&U4na:yT");
		generateFile(data, new File("E:\\personal\\SAMPLE-VIDEO\\case1\\case2.mp4"));
	}

}
