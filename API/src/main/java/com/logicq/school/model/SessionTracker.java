package com.logicq.school.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SESSION_TRACKER")
public class SessionTracker {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Long id;

	@Column(name = "USER_NAME")
	private String userName;

	@Column(name = "CLASS_ID")
	private Long classId;

	@Column(name = "SUBJECT_ID")
	private Long subjectId;

	@Column(name = "CHAPTER_ID")
	private Long chapterId;

	@Column(name = "TOPIC_ID")
	private Long topicId;

	@Column(name = "CLASS_NAME")
	private String className;

	@Column(name = "SUBJECT_NAME")
	private String subjectName;

	@Column(name = "CHAPTER_NAME")
	private String chapterName;

	@Column(name = "TOPIC_NAME")
	private String topicName;

	@Column(name = "START_TIME")
	private Date startTime;

	@Column(name = "END_TIME")
	private Date endTime;

	@Column(name = "TOPIC_REQUIRED_TIME")
	private Long topicRequiredTime;

	@Column(name = "STATUS")
	private String status;

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
	 * @return the classId
	 */
	public Long getClassId() {
		return classId;
	}

	/**
	 * @param classId the classId to set
	 */
	public void setClassId(Long classId) {
		this.classId = classId;
	}

	/**
	 * @return the subjectId
	 */
	public Long getSubjectId() {
		return subjectId;
	}

	/**
	 * @param subjectId the subjectId to set
	 */
	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	/**
	 * @return the chapterId
	 */
	public Long getChapterId() {
		return chapterId;
	}

	/**
	 * @param chapterId the chapterId to set
	 */
	public void setChapterId(Long chapterId) {
		this.chapterId = chapterId;
	}

	/**
	 * @return the topicId
	 */
	public Long getTopicId() {
		return topicId;
	}

	/**
	 * @param topicId the topicId to set
	 */
	public void setTopicId(Long topicId) {
		this.topicId = topicId;
	}

	/**
	 * @return the startTime
	 */
	public Date getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return the endTime
	 */
	public Date getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	/**
	 * @return the topicRequiredTime
	 */
	public Long getTopicRequiredTime() {
		return topicRequiredTime;
	}

	/**
	 * @param topicRequiredTime the topicRequiredTime to set
	 */
	public void setTopicRequiredTime(Long topicRequiredTime) {
		this.topicRequiredTime = topicRequiredTime;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the className
	 */
	public String getClassName() {
		return className;
	}

	/**
	 * @param className the className to set
	 */
	public void setClassName(String className) {
		this.className = className;
	}

	/**
	 * @return the subjectName
	 */
	public String getSubjectName() {
		return subjectName;
	}

	/**
	 * @param subjectName the subjectName to set
	 */
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

	/**
	 * @return the chapterName
	 */
	public String getChapterName() {
		return chapterName;
	}

	/**
	 * @param chapterName the chapterName to set
	 */
	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}

	/**
	 * @return the topicName
	 */
	public String getTopicName() {
		return topicName;
	}

	/**
	 * @param topicName the topicName to set
	 */
	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

}
