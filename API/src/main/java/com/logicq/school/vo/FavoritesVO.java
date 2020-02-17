package com.logicq.school.vo;

import java.io.Serializable;
import java.util.Date;

import com.logicq.school.model.TopicDetails;

public class FavoritesVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6247436624995875508L;

	private Long id;

	private String userName;

	private String typeValue;

	private String classId;

	private String subjectId;

	private String chapterId;

	private String topicId;

	private Date markDate;

	private TopicDetails topicDetails;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the typeValue
	 */
	public String getTypeValue() {
		return typeValue;
	}

	/**
	 * @param typeValue the typeValue to set
	 */
	public void setTypeValue(String typeValue) {
		this.typeValue = typeValue;
	}

	/**
	 * @return the classId
	 */
	public String getClassId() {
		return classId;
	}

	/**
	 * @param classId the classId to set
	 */
	public void setClassId(String classId) {
		this.classId = classId;
	}

	/**
	 * @return the subjectId
	 */
	public String getSubjectId() {
		return subjectId;
	}

	/**
	 * @param subjectId the subjectId to set
	 */
	public void setSubjectId(String subjectId) {
		this.subjectId = subjectId;
	}

	/**
	 * @return the chapterId
	 */
	public String getChapterId() {
		return chapterId;
	}

	/**
	 * @param chapterId the chapterId to set
	 */
	public void setChapterId(String chapterId) {
		this.chapterId = chapterId;
	}

	/**
	 * @return the topicId
	 */
	public String getTopicId() {
		return topicId;
	}

	/**
	 * @param topicId the topicId to set
	 */
	public void setTopicId(String topicId) {
		this.topicId = topicId;
	}

	/**
	 * @return the markDate
	 */
	public Date getMarkDate() {
		return markDate;
	}

	/**
	 * @param markDate the markDate to set
	 */
	public void setMarkDate(Date markDate) {
		this.markDate = markDate;
	}

	/**
	 * @return the topicDetails
	 */
	public TopicDetails getTopicDetails() {
		return topicDetails;
	}

	/**
	 * @param topicDetails the topicDetails to set
	 */
	public void setTopicDetails(TopicDetails topicDetails) {
		this.topicDetails = topicDetails;
	}

}
