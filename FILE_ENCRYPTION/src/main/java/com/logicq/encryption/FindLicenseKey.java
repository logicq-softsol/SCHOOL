package com.logicq.encryption;

import java.io.File;
import java.util.Scanner;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.logicq.encryption.model.LicenseDetails;
import com.logicq.encryption.util.LogicQEncryptionAndDecryption;

public class FindLicenseKey {

	public static void main(String[] args) throws Exception {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter file to get license key : ");
		String filePath = scanner.nextLine();
		LicenseDetails license = getLicense(filePath);
		String licenseKey = LogicQEncryptionAndDecryption.decrypt(license.getLicenseKey(), "7?jUQ_-U&U4na:yT");
		System.out.println(" License Key : " + licenseKey);
	}

	public static LicenseDetails getLicense(String filePath) throws Exception {
		byte[] data = LogicQEncryptionAndDecryption.readFileAndDecryptFile(new File(filePath), "7?jUQ_-U&U4na:yT");
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
		return objectMapper.readValue(data, LicenseDetails.class);
	}

}
