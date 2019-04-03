package com.logicq.encryption;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;

public class SchoolSecurityUtils {

	public PrivateKey getPrivate(String filename) throws Exception {
		byte[] keyBytes = Files.readAllBytes(new File(filename).toPath());
		PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(keyBytes));
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		return keyFactory.generatePrivate(keySpec);
	}
	
	
	public PrivateKey getPrivate(LicenseDetails license) throws Exception {
		//byte[] keyBytes = Files.readAllBytes(new File(filename).toPath());
		PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(license.getPrivateKey().getBytes(StandardCharsets.UTF_8)));
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		return keyFactory.generatePrivate(keySpec);
	}

	// https://docs.oracle.com/javase/8/docs/api/java/security/spec/X509EncodedKeySpec.html
	public PublicKey getPublic(String folder) throws Exception {
		byte[] keyBytes = Files.readAllBytes(new File(folder + "/KeyPair/publicKey").toPath());
		X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		return keyFactory.generatePublic(keySpec);
	}

	public void encryptFile(byte[] input, File output, PrivateKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		writeToFile(output, cipher.doFinal(input));
	}

	public void decryptFile(byte[] input, File output, PublicKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.DECRYPT_MODE, key);
		writeToFile(output, cipher.doFinal(input));
	}

	public String encryptText(String msg, PrivateKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		return Base64.getEncoder().encodeToString(cipher.doFinal(msg.getBytes("UTF-8")));
	}

	public String decryptText(String msg, PublicKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
		cipher.init(Cipher.DECRYPT_MODE, key);
		return new String(cipher.doFinal(Base64.getDecoder().decode(msg)), "UTF-8");
	}

	public byte[] getFileInBytes(File f) throws IOException {
		FileInputStream fis = new FileInputStream(f);
		byte[] fbytes = new byte[(int) f.length()];
		fis.read(fbytes);
		fis.close();
		return fbytes;
	}

	private void writeToFile(File output, byte[] toWrite)
			throws IllegalBlockSizeException, BadPaddingException, IOException {
		FileOutputStream fos = new FileOutputStream(output);
		fos.write(toWrite);
		fos.flush();
		fos.close();
	}

}
