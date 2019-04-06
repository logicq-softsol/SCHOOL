package com.logicq.school.vo;

public class ActivateKey {

	private Long id;
	private String hostName;
	private String hostKey;
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
