package com.logicq.school.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "QUESTION_DETAILS")
public class QuestionDetails {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "CLASS_ID")
	private String classId;

	@Column(name = "SUBJECT_ID")
	private String subjectId;

	@Column(name = "CHAPTER_ID")
	private String chapterId;

	@Column(name = "QUESTION", columnDefinition = "TEXT")
	private String question;

	@Column(name = "OPTION1", columnDefinition = "TEXT")
	private String option1;

	@Column(name = "OPTION2", columnDefinition = "TEXT")
	private String option2;

	@Column(name = "OPTION3", columnDefinition = "TEXT")
	private String option3;

	@Column(name = "OPTION4", columnDefinition = "TEXT")
	private String option4;

	@Column(name = "OPTION5", columnDefinition = "TEXT")
	private String option5;

	@Column(name = "CORRECT_ANS", columnDefinition = "TEXT")
	private String correctAns;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "SCORE")
	private Long score;

	@Column(name = "APPLICABLE_FOR")
	private String applicableFor;

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
	 * @return the question
	 */
	public String getQuestion() {
		return question;
	}

	/**
	 * @param question the question to set
	 */
	public void setQuestion(String question) {
		this.question = question;
	}

	/**
	 * @return the option1
	 */
	public String getOption1() {
		return option1;
	}

	/**
	 * @param option1 the option1 to set
	 */
	public void setOption1(String option1) {
		this.option1 = option1;
	}

	/**
	 * @return the option2
	 */
	public String getOption2() {
		return option2;
	}

	/**
	 * @param option2 the option2 to set
	 */
	public void setOption2(String option2) {
		this.option2 = option2;
	}

	/**
	 * @return the option3
	 */
	public String getOption3() {
		return option3;
	}

	/**
	 * @param option3 the option3 to set
	 */
	public void setOption3(String option3) {
		this.option3 = option3;
	}

	/**
	 * @return the option4
	 */
	public String getOption4() {
		return option4;
	}

	/**
	 * @param option4 the option4 to set
	 */
	public void setOption4(String option4) {
		this.option4 = option4;
	}

	/**
	 * @return the option5
	 */
	public String getOption5() {
		return option5;
	}

	/**
	 * @param option5 the option5 to set
	 */
	public void setOption5(String option5) {
		this.option5 = option5;
	}

	/**
	 * @return the correctAns
	 */
	public String getCorrectAns() {
		return correctAns;
	}

	/**
	 * @param correctAns the correctAns to set
	 */
	public void setCorrectAns(String correctAns) {
		this.correctAns = correctAns;
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

	/**
	 * @return the score
	 */
	public Long getScore() {
		return score;
	}

	/**
	 * @param score the score to set
	 */
	public void setScore(Long score) {
		this.score = score;
	}

	/**
	 * @return the applicableFor
	 */
	public String getApplicableFor() {
		return applicableFor;
	}

	/**
	 * @param applicableFor the applicableFor to set
	 */
	public void setApplicableFor(String applicableFor) {
		this.applicableFor = applicableFor;
	}

}
