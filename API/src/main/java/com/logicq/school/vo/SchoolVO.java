package com.logicq.school.vo;

import java.io.Serializable;
import java.util.List;

public class SchoolVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	private String namme;
	private String displayName;
	private String description;
	private String imgURL;
	private String email;
	private String phone;
	private String productname;
	private String version;
	private String installdate;
	private String licensedays;
	private String boardtype;
	private List<String> classlist;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the namme
	 */
	public String getNamme() {
		return namme;
	}

	/**
	 * @param namme the namme to set
	 */
	public void setNamme(String namme) {
		this.namme = namme;
	}

	/**
	 * @return the displayName
	 */
	public String getDisplayName() {
		return displayName;
	}

	/**
	 * @param displayName the displayName to set
	 */
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the imgURL
	 */
	public String getImgURL() {
		return imgURL;
	}

	/**
	 * @param imgURL the imgURL to set
	 */
	public void setImgURL(String imgURL) {
		this.imgURL = imgURL;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the productname
	 */
	public String getProductname() {
		return productname;
	}

	/**
	 * @param productname the productname to set
	 */
	public void setProductname(String productname) {
		this.productname = productname;
	}

	/**
	 * @return the version
	 */
	public String getVersion() {
		return version;
	}

	/**
	 * @param version the version to set
	 */
	public void setVersion(String version) {
		this.version = version;
	}

	/**
	 * @return the installdate
	 */
	public String getInstalldate() {
		return installdate;
	}

	/**
	 * @param installdate the installdate to set
	 */
	public void setInstalldate(String installdate) {
		this.installdate = installdate;
	}

	/**
	 * @return the licensedays
	 */
	public String getLicensedays() {
		return licensedays;
	}

	/**
	 * @param licensedays the licensedays to set
	 */
	public void setLicensedays(String licensedays) {
		this.licensedays = licensedays;
	}

	/**
	 * @return the boardtype
	 */
	public String getBoardtype() {
		return boardtype;
	}

	/**
	 * @param boardtype the boardtype to set
	 */
	public void setBoardtype(String boardtype) {
		this.boardtype = boardtype;
	}

	/**
	 * @return the classlist
	 */
	public List<String> getClasslist() {
		return classlist;
	}

	/**
	 * @param classlist the classlist to set
	 */
	public void setClasslist(List<String> classlist) {
		this.classlist = classlist;
	}

}
