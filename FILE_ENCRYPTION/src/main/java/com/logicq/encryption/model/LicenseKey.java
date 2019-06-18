package com.logicq.encryption.model;

public class LicenseKey {

	private Long id;
	private String hostName;
	private String hostKey;
	private String hostKeySalt;
	private String key;

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

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
