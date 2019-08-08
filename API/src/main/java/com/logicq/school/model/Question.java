package com.logicq.school.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "QUESTION")
public class Question implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7616265245491755087L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "QUESTION_FOR")
	private String questionFor;

	@Column(name = "FOR_VALUE")
	private Long questionForValue;

	@Column(name = "FILE_URL")
	private String fileURL;

	@Column(name = "FILE_TYPE")
	private String fileType;

	@Column(name = "LAST_UPDATE")
	private Date lastUpdate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestionFor() {
		return questionFor;
	}

	public void setQuestionFor(String questionFor) {
		this.questionFor = questionFor;
	}

	public Long getQuestionForValue() {
		return questionForValue;
	}

	public void setQuestionForValue(Long questionForValue) {
		this.questionForValue = questionForValue;
	}

	public String getFileURL() {
		return fileURL;
	}

	public void setFileURL(String fileURL) {
		this.fileURL = fileURL;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

}
