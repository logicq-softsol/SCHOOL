package com.logicq.school.vo;

import java.io.Serializable;

public class RecoverVO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5242172683453335634L;
	private String userName;
	private String licenseKey;
	private String password;
	private String newPassword;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getLicenseKey() {
		return licenseKey;
	}

	public void setLicenseKey(String licenseKey) {
		this.licenseKey = licenseKey;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

}
