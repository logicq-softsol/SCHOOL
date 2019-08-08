package com.logicq.school.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "SUBJECT_DETAIL")
public class SubjectDetails extends AttributeDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7637092904433073723L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "CLASS_ID")
	private Long classId;

	@Column(name = "IMAGE_URL")
	private String icon;

	@Column(name = "PLAY_FILE_URL")
	private String playFileURL;

	@Column(name = "PLAY_FILE_TYPE")
	private String playFileType;

	@Column(name = "TIME_REQUIRED")
	private Long timeRequired = 0l;

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

	public Long getTimeRequired() {
		return timeRequired;
	}

	public void setTimeRequired(Long timeRequired) {
		this.timeRequired = timeRequired;
	}

}
