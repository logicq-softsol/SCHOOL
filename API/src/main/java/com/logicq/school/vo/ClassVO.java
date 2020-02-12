package com.logicq.school.vo;

import java.io.Serializable;
import java.util.List;

public class ClassVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1955281292346930298L;
	
	private String id;
	private String name;
	private String displayName;
	private String description;
	private String imgURL;
	private List<SubjectVO> subjects;
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
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
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
	 * @return the subjects
	 */
	public List<SubjectVO> getSubjects() {
		return subjects;
	}
	/**
	 * @param subjects the subjects to set
	 */
	public void setSubjects(List<SubjectVO> subjects) {
		this.subjects = subjects;
	}
	
	

}
