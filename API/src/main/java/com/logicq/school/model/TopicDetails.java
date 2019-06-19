package com.logicq.school.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "CLASS_ID")
	private Long classId;

	@Column(name = "SUBJECT_ID")
	private Long subjectId;

	@Column(name = "CHAPTER_ID")
	private Long chapterId;

	@Column(name = "IMAGE_URL")
	private String icon;

	@Column(name = "PLAY_FILE_URL")
	private String playFileURL;

	@Column(name = "PLAY_FILE_TYPE")
	private String playFileType;

	@Column(name = "PLAY_FILE_TIME")
	private Long playFileTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getClassId() {
		return classId;
	}

	public void setClassId(Long classId) {
		this.classId = classId;
	}

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	public Long getChapterId() {
		return chapterId;
	}

	public void setChapterId(Long chapterId) {
		this.chapterId = chapterId;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getPlayFileURL() {
		return playFileURL;
	}

	public void setPlayFileURL(String playFileURL) {
		this.playFileURL = playFileURL;
	}

	public String getPlayFileType() {
		return playFileType;
	}

	public void setPlayFileType(String playFileType) {
		this.playFileType = playFileType;
	}

	/**
	 * @return the playFileTime
	 */
	public Long getPlayFileTime() {
		return playFileTime;
	}

	/**
	 * @param playFileTime the playFileTime to set
	 */
	public void setPlayFileTime(Long playFileTime) {
		this.playFileTime = playFileTime;
	}

}
