package com.logicq.school.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
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

	@Column(name = "NAME")
	private String name;

	@Column(name = "QUESTION_FOR")
	private Long questionFor;
	
	
	@Column(name = "TYPE")
	private String type;

	@Lob
	@Column(name = "questions", columnDefinition = "BLOB")
	private byte[] questions;

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
	 * @return the questions
	 */
	public byte[] getQuestions() {
		return questions;
	}

	/**
	 * @param questions the questions to set
	 */
	public void setQuestions(byte[] questions) {
		this.questions = questions;
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
	 * @return the questionFor
	 */
	public Long getQuestionFor() {
		return questionFor;
	}

	/**
	 * @param questionFor the questionFor to set
	 */
	public void setQuestionFor(Long questionFor) {
		this.questionFor = questionFor;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	
	
}
