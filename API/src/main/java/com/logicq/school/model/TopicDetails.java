package com.logicq.school.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TOPIC_DETAIL")
public class TopicDetails extends AttributeDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5004745992206459537L;

	@Id
	@Column(name = "ID")
	private String id;

	@Column(name = "CLASS_ID")
	private String classId;

	@Column(name = "SUBJECT_ID")
	private String subjectId;

	@Column(name = "CHAPTER_ID")
	private String chapterId;

	@Column(name = "IMAGE_URL")
	private String imgURL;

	@Column(name = "CONTENT_TYPE")
	private String contentType;

	@Column(name = "CONTENT_URL")
	private String contentURL;

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
	 * @return the contentType
	 */
	public String getContentType() {
		return contentType;
	}

	/**
	 * @param contentType the contentType to set
	 */
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	/**
	 * @return the contentURL
	 */
	public String getContentURL() {
		return contentURL;
	}

	/**
	 * @param contentURL the contentURL to set
	 */
	public void setContentURL(String contentURL) {
		this.contentURL = contentURL;
	}

}
