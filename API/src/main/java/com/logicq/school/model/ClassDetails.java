package com.logicq.school.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CLASS_DETAIL")
public class ClassDetails extends AttributeDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9099945953676406880L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "IMAGE_URL")
	private String icon;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

}
