package com.logicq.school.vo;

import java.io.Serializable;
import java.util.List;

public class SubjectVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9177160243232495086L;
	private String id;
	private String name;
	private String displayName;
	private String description;
	private String imgURL;
	private List<ChapterVO> chapters;
	private List<ContentDetailsVO> learn;
	private List<ContentDetailsVO> practices;
	private List<ContentDetailsVO> tests;

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
	 * @return the chapters
	 */
	public List<ChapterVO> getChapters() {
		return chapters;
	}

	/**
	 * @param chapters the chapters to set
	 */
	public void setChapters(List<ChapterVO> chapters) {
		this.chapters = chapters;
	}

	/**
	 * @return the learn
	 */
	public List<ContentDetailsVO> getLearn() {
		return learn;
	}

	/**
	 * @param learn the learn to set
	 */
	public void setLearn(List<ContentDetailsVO> learn) {
		this.learn = learn;
	}

	/**
	 * @return the practices
	 */
	public List<ContentDetailsVO> getPractices() {
		return practices;
	}

	/**
	 * @param practices the practices to set
	 */
	public void setPractices(List<ContentDetailsVO> practices) {
		this.practices = practices;
	}

	/**
	 * @return the tests
	 */
	public List<ContentDetailsVO> getTests() {
		return tests;
	}

	/**
	 * @param tests the tests to set
	 */
	public void setTests(List<ContentDetailsVO> tests) {
		this.tests = tests;
	}

}
