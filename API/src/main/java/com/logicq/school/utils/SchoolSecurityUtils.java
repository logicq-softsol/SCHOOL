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
import java.util.Map;
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
import org.springframework.core.env.Environment;
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

	@Autowired
	Environment env;

	public String getTokenHostName() throws Exception {
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			return tokenProvider.getHostNameFromTokenParser(tokenProvider.getJwtFromRequest(context));
		} else {
			throw new Exception(" User is Not Authorized to acess ");
		}
	}

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
		String systemkey = env.getProperty("school.system.address");
		while (true) {
			String line = inn.readLine();
			if (line.toLowerCase().matches(systemkey.toLowerCase())) {
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

}
