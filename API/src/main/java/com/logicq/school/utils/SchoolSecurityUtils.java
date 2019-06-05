package com.logicq.school.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.security.Security;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.logicq.school.model.LoginDetails;
import com.logicq.school.repository.LoginDetailsRepo;
import com.logicq.school.security.JwtTokenProvider;

@Component
public class SchoolSecurityUtils {

	static Logger LOG = LoggerFactory.getLogger(SchoolSecurityUtils.class);

	@Autowired
	LoginDetailsRepo loginDetailsRepo;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private HttpServletRequest context;

	public LoginDetails getUserFromSecurityContext() throws Exception {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			String userName = tokenProvider.getUserIdFromJWT(tokenProvider.getJwtFromRequest(context));
			return loginDetailsRepo.findByUserName(userName);
		} else {
			throw new Exception(" User is Not Authorized to acess ");
		}
	}

	public String getSystemHostName() throws Exception {
		String ethernetPhysicalAddr = "";
		String command = "ipconfig /all";
		Process p = Runtime.getRuntime().exec(command);
		BufferedReader inn = new BufferedReader(new InputStreamReader(p.getInputStream()));
		Pattern pattern = Pattern.compile(".*Physical Addres.*: (.*)");
		boolean checkFlag = false;
		while (true) {
			String line = inn.readLine();

			if (line.toLowerCase().matches("ethernet adapter ethernet:")) {
				checkFlag = true;
			}
			if (checkFlag) {
				Matcher mm = pattern.matcher(line);
				if (mm.matches()) {
					ethernetPhysicalAddr = mm.group(1).replaceAll("-", "");
					checkFlag = false;
					break;
				}

			}

		}
		return ethernetPhysicalAddr;
	}

	public String decrypt(String strToDecrypt, String key, String salt) {
		try {
			Security.setProperty("crypto.policy", "unlimited");
			byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
			IvParameterSpec ivspec = new IvParameterSpec(iv);
			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(key.toCharArray(), salt.getBytes(), 65536, 256);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
			return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
		} catch (Exception ex) {
			LOG.error("Error while decrypting: " + ex.getMessage(), ex);
		}
		return null;
	}

	public byte[] readFileAndDecryptFile(File fileToBeDecrypt, String key, String salt) throws IOException {

		FileInputStream fis = new FileInputStream(fileToBeDecrypt);
		byte[] fbytes = new byte[(int) fileToBeDecrypt.length()];
		fis.read(fbytes);
		fis.close();

		return decryptFile(fbytes, key, salt);
	}

	private byte[] decryptFile(byte[] dataToDecrypt, String key, String salt) {
		try {
			Security.setProperty("crypto.policy", "unlimited");
			byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
			IvParameterSpec ivspec = new IvParameterSpec(iv);

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(key.toCharArray(), salt.getBytes(), 65536, 256);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
			return cipher.doFinal(dataToDecrypt);
		} catch (Exception ex) {
			LOG.error(" Unable to decrypt : " + ex.getMessage());
		}
		return null;
	}

}
