package com.logicq.encryption;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
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
		byte[] keyBytes = Files
				.readAllBytes(new File(getClass().getClassLoader().getResource(filename).getFile()).toPath());
		PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		return kf.generatePrivate(spec);
	}

	// https://docs.oracle.com/javase/8/docs/api/java/security/spec/X509EncodedKeySpec.html
	public PublicKey getPublic(File publicKeyFile) throws Exception {
		byte[] keyBytes = Files.readAllBytes(publicKeyFile.toPath());
		X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		return kf.generatePublic(spec);
	}

	public void encryptFile(byte[] input, File output, PrivateKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		writeToFile(output, cipher.doFinal(input));
	}

	public void decryptFile(byte[] input, File output, PublicKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, key);
		writeToFile(output, cipher.doFinal(input));
	}

	public String encryptText(String msg, PrivateKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.ENCRYPT_MODE, key);
		return Base64.getEncoder().encodeToString(cipher.doFinal(msg.getBytes("UTF-8")));
	}

	public String decryptText(String msg, PublicKey key) throws Exception {
		Cipher cipher = Cipher.getInstance("RSA");
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

	// https://docs.oracle.com/javase/8/docs/api/java/security/spec/X509EncodedKeySpec.html
	public String readFileLine(String filename) throws Exception {
		List<String> lines = Files
				.readAllLines(new File(getClass().getClassLoader().getResource(filename).getFile()).toPath());
		return lines.get(0);
	}

	public String readLicenseKey(File licenseFolder) throws IOException {
		List<String> lines = Files.readAllLines(findFileForKey(licenseFolder).toPath());
		return lines.get(0);
	}

	public File readPublicKey(File licenseFolder) throws IOException {
		return findFileForPublicKey(licenseFolder);
	}

	public File findFileForPublicKey(File folder) throws IOException {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isFile() && "publicKey".equalsIgnoreCase(fileEntry.getName())) {
				return fileEntry;
			}
		}
		return null;
	}

	public File findFileForKey(File folder) throws IOException {
		for (final File fileEntry : folder.listFiles()) {
			if (fileEntry.isFile() && "license.key".equalsIgnoreCase(fileEntry.getName())) {
				return fileEntry;
			}
		}
		return null;
	}
}
