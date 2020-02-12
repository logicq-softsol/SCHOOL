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
@Table(name = "CHAPTER_DETAIL")
public class ChapterDetails extends AttributeDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8228166780903680083L;

	@Id
	@Column(name = "ID")
	private String id;

	@Column(name = "CLASS_ID")
	private String classId;

	@Column(name = "SUBJECT_ID")
	private String subjectId;

	@Column(name = "IMAGE_URL")
	private String imgURL;

	@Column(name = "IS_VIDEO")
	private Boolean isVideo;

	@Column(name = "IS_PPT")
	private Boolean isPPt;

	@Column(name = "IS_PDF")
	private Boolean isPDF;

	@Column(name = "IS_MCQ")
	private Boolean isMCQ;

	@Column(name = "IS_SAMPLE_QUESTION")
	private Boolean isSampleQuest;

	@Column(name = "IS_EXAM_QUESTION")
	private Boolean isExamQuest;

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
	 * @return the isVideo
	 */
	public Boolean getIsVideo() {
		return isVideo;
	}

	/**
	 * @param isVideo the isVideo to set
	 */
	public void setIsVideo(Boolean isVideo) {
		this.isVideo = isVideo;
	}

	/**
	 * @return the isPPt
	 */
	public Boolean getIsPPt() {
		return isPPt;
	}

	/**
	 * @param isPPt the isPPt to set
	 */
	public void setIsPPt(Boolean isPPt) {
		this.isPPt = isPPt;
	}

	/**
	 * @return the isPDF
	 */
	public Boolean getIsPDF() {
		return isPDF;
	}

	/**
	 * @param isPDF the isPDF to set
	 */
	public void setIsPDF(Boolean isPDF) {
		this.isPDF = isPDF;
	}

	/**
	 * @return the isMCQ
	 */
	public Boolean getIsMCQ() {
		return isMCQ;
	}

	/**
	 * @param isMCQ the isMCQ to set
	 */
	public void setIsMCQ(Boolean isMCQ) {
		this.isMCQ = isMCQ;
	}

	/**
	 * @return the isSampleQuest
	 */
	public Boolean getIsSampleQuest() {
		return isSampleQuest;
	}

	/**
	 * @param isSampleQuest the isSampleQuest to set
	 */
	public void setIsSampleQuest(Boolean isSampleQuest) {
		this.isSampleQuest = isSampleQuest;
	}

	/**
	 * @return the isExamQuest
	 */
	public Boolean getIsExamQuest() {
		return isExamQuest;
	}

	/**
	 * @param isExamQuest the isExamQuest to set
	 */
	public void setIsExamQuest(Boolean isExamQuest) {
		this.isExamQuest = isExamQuest;
	}

}
