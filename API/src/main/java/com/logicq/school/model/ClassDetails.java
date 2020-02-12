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
	private String id;

	@Column(name = "IMAGE_URL")
	private String imgURL;

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

	
	

}
