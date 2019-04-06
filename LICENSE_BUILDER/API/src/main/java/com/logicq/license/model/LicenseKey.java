package com.logicq.license.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "LICENSE_KEY")
public class LicenseKey {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "HOST_NAME", unique = true)
	private String hostName;

	@Column(name = "HOST_KEY", unique = true)
	private String hostKey;

	@Column(name = "HOST_KEY_SALT", unique = true)
	private String hostKeySalt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	public String getHostKey() {
		return hostKey;
	}

	public void setHostKey(String hostKey) {
		this.hostKey = hostKey;
	}

	public String getHostKeySalt() {
		return hostKeySalt;
	}

	public void setHostKeySalt(String hostKeySalt) {
		this.hostKeySalt = hostKeySalt;
	}

}
