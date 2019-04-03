package com.logicq.school.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.security.GeneralSecurityException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.logicq.school.model.ActivationDetails;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.TopicDetails;
import com.logicq.school.repository.LoginDetailsRepo;
import com.logicq.school.security.JwtTokenProvider;

@Component
public class SchoolSecurityUtils {
	private static final String TRANSFORMATION = "AES";
	private static final String ALGORITHM = "RSA";

	@Autowired
	LoginDetailsRepo loginDetailsRepo;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private HttpServletRequest context;

	@Autowired
	private Environment env;

	public LoginDetails getUserFromSecurityContext() throws Exception {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			String userName = tokenProvider.getUserIdFromJWT(tokenProvider.getJwtFromRequest(context));
			return loginDetailsRepo.findByUserName(userName);
		} else {
			throw new Exception(" User is Not Authorized to acess ");
		}
	}

	public PrivateKey getPrivate(String privateKey) throws Exception {
		PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKey.getBytes()));
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		return keyFactory.generatePrivate(keySpec);
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

	public String getSystemHostName() throws Exception {
		InetAddress ip = InetAddress.getLocalHost();
		return ip.getHostName();
	}

	public void decryptVideoFile(ActivationDetails activationDetails, TopicDetails topic, HttpServletResponse response)
			throws Exception {
		try {
			File inputFile = new File(topic.getPlayFileURL());
			Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
			cipher.init(Cipher.DECRYPT_MODE, getPrivate(activationDetails.getActivationKey()));
			FileInputStream inputStream = new FileInputStream(inputFile);
			byte[] inputBytes = new byte[(int) inputFile.length()];
			inputStream.read(inputBytes);

			byte[] outputBytes = cipher.doFinal(inputBytes);
			response.getOutputStream().write(outputBytes);
			inputStream.close();
			response.setContentType("video/mp4");
			response.setHeader("Content-Disposition", "attachment; filename=\"xyz.mp4\"");
			response.getOutputStream().flush();

		} catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeyException | BadPaddingException
				| IllegalBlockSizeException | IOException ex) {
			ex.printStackTrace();
		}
	}

}
