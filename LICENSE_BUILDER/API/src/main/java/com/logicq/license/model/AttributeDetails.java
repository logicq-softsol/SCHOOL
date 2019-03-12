package com.logicq.license.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class AttributeDetails implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4650323113586973841L;

	@Column(name = "NAME")
	private String name;

	@Column(name = "DISPLAY_NAME")
	private String displayName;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "DESCRIPTION")
	private String description;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


}
