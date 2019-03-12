package com.logicq.license.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "LOGIN_DETAILS")
public class LoginDetails implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8498267424573609285L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "STATUS")
	private String loginStatus;

	@Column(name = "LOGIN_TIME")
	private Date loginTime;

	@Column(name = "USER_NAME")
	private String userName;

	@Column(name = "LOGIN_BY")
	private String loginBy;

	@Column(name = "PASSWORD")
	private String password;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(String loginStatus) {
		this.loginStatus = loginStatus;
	}

	public Date getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	public String getLoginBy() {
		return loginBy;
	}

	public void setLoginBy(String loginBy) {
		this.loginBy = loginBy;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	
}
