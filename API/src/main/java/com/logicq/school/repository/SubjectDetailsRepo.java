package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.SubjectDetails;

@Repository
public interface SubjectDetailsRepo extends JpaRepository<SubjectDetails, Long> {

	List<SubjectDetails> findByClassId(Long classId);

	SubjectDetails findByClassIdAndId(Long classId, Long subjectId);
	SubjectDetails findByClassIdAndName(Long classId, String subjectName);
}
