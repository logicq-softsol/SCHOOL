package com.logicq.school.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ACTIVATION_DETAILS")
public class ActivationDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Long id;

	@Column(name = "ACTIVATION_LICENSE")
	private String activationLicense;

	@Column(name = "ACTIVATION_KEY")
	private String activationKey;

	@Column(name = "ACTIVATION_TOKEN")
	private String activationToken;

	@Column(name = "ACTIVATION_FOR")
	private String activationFor;

	@Column(name = "PRODUCT_NAME")
	private String productName;

	@Column(name = "PRODUCT_VERSION")
	private String productVersion;

	@Column(name = "LAST_UPDATE")
	private Date lastUpdate;

	@Column(name = "ACTIVATE_DATE")
	private Date activationDate;

	@Column(name = "STATUS")
	private String productStatus;

	@Column(name = "EXPIRY_DATE")
	private Date expiryDate;

	@Column(name = "ACTIVATION_DAYS")
	private long activationDays;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getActivationKey() {
		return activationKey;
	}

	public void setActivationKey(String activationKey) {
		this.activationKey = activationKey;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductVersion() {
		return productVersion;
	}

	public void setProductVersion(String productVersion) {
		this.productVersion = productVersion;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Date getActivationDate() {
		return activationDate;
	}

	public void setActivationDate(Date activationDate) {
		this.activationDate = activationDate;
	}

	public String getProductStatus() {
		return productStatus;
	}

	public void setProductStatus(String productStatus) {
		this.productStatus = productStatus;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getActivationFor() {
		return activationFor;
	}

	public String getActivationToken() {
		return activationToken;
	}

	public void setActivationToken(String activationToken) {
		this.activationToken = activationToken;
	}

	public void setActivationFor(String activationFor) {
		this.activationFor = activationFor;
	}

	public String getActivationLicense() {
		return activationLicense;
	}

	public void setActivationLicense(String activationLicense) {
		this.activationLicense = activationLicense;
	}

	public long getActivationDays() {
		return activationDays;
	}

	public void setActivationDays(long activationDays) {
		this.activationDays = activationDays;
	}

}
