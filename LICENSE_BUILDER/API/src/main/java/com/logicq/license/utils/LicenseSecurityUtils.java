package com.logicq.license.utils;

import java.net.InetAddress;
import java.security.spec.KeySpec;
import java.util.Base64;

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
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.logicq.license.model.LicenseKey;
import com.logicq.license.model.LoginDetails;
import com.logicq.license.repository.LoginDetailsRepo;
import com.logicq.license.security.JwtTokenProvider;

@Component
public class LicenseSecurityUtils {

	Logger LOG = LoggerFactory.getLogger(LicenseSecurityUtils.class);

	@Autowired
	LoginDetailsRepo loginDetailsRepo;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	HttpServletRequest context;

	@Autowired
	Environment env;

	public LoginDetails getUserFromSecurityContext() throws Exception {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			String userName = tokenProvider.getUserIdFromJWT(tokenProvider.getJwtFromRequest(context));
			return loginDetailsRepo.findByUserName(userName);
		} else {
			throw new Exception(" User is Not Authorized to acess ");
		}
	}

	public String getSystemHostName() throws Exception {
		InetAddress ip = InetAddress.getLocalHost();
		return ip.getHostName();
	}

	public String encryptText(String strToEncrypt, LicenseKey key) {
		try {

			byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
			IvParameterSpec ivspec = new IvParameterSpec(iv);

			SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
			KeySpec spec = new PBEKeySpec(key.getHostKey().toCharArray(), key.getHostKeySalt().getBytes(), 65536, 256);
			SecretKey tmp = factory.generateSecret(spec);
			SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivspec);
			return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes("UTF-8")));
		} catch (Exception ex) {
			LOG.error("Unable to Encrypt data.", ex);
		}
		return null;
	}
}
