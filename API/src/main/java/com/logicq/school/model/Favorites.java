package com.logicq.school.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USER_FAV")
public class Favorites extends AttributeDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7113551475978978085L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "USER_NAME")
	private String userName;

	@Column(name = "TYPE_VALUE")
	private Long typeValue;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getTypeValue() {
		return typeValue;
	}

	public void setTypeValue(Long typeValue) {
		this.typeValue = typeValue;
	}

}
