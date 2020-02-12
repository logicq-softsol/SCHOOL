package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.SubjectDetails;

@Repository
public interface SubjectDetailsRepo extends JpaRepository<SubjectDetails, String> {

	List<SubjectDetails> findByClassId(String classId);

	SubjectDetails findByClassIdAndId(String classId, String subjectId);
	SubjectDetails findByClassIdAndName(String classId, String subjectName);
}
