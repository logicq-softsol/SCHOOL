package com.logicq.school.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.SubjectDetails;
import com.logicq.school.model.TopicDetails;
import com.logicq.school.repository.ChapterDetailsRepo;
import com.logicq.school.repository.ClassesDetailsRepo;
import com.logicq.school.repository.SubjectDetailsRepo;
import com.logicq.school.repository.TopicDetailsRepo;
import com.logicq.school.service.FileStorageService;
import com.logicq.school.vo.UploadFileResponse;

@RestController
@RequestMapping("/api")
public class FileController {
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileStorageService fileStorageService;

	@Autowired
	ClassesDetailsRepo classesDetailsRepo;

	@Autowired
	SubjectDetailsRepo subjectDetailsRepo;

	@Autowired
	ChapterDetailsRepo chapterDetailsRepo;

	@Autowired
	TopicDetailsRepo topicDetailsRepo;

	@PostMapping("/uploadFile")
	public UploadFileResponse uploadFileForClass(@RequestParam("file") MultipartFile file,
			@RequestParam("entityId") String entityId, @RequestParam("entityType") String entityType,
			@RequestParam("classId") String classId, @RequestParam("subjectId") String subjectId,
			@RequestParam("chapterId") String chapterId) {
		String fileName = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/downloadFile/")
				.path(fileName).toUriString();
		if ("CLASS".equals(entityType)) {
			ClassDetails classDetails = classesDetailsRepo.findOne(Long.valueOf(entityId));
			classDetails.setIcon(fileDownloadUri);
			classesDetailsRepo.save(classDetails);
		} else if ("SUBJECT".equals(entityType)) {
			SubjectDetails subjectDetails = subjectDetailsRepo.findByClassIdAndId(Long.valueOf(classId),
					Long.valueOf(entityId));
			subjectDetails.setIcon(fileDownloadUri);
			subjectDetailsRepo.save(subjectDetails);
		} else if ("CHAPTER".equals(entityType)) {
			ChapterDetails chapterDetails = chapterDetailsRepo.findByClassIdAndSubjectIdAndId(Long.valueOf(classId),
					Long.valueOf(subjectId), Long.valueOf(entityId));
			chapterDetails.setIcon(fileDownloadUri);
			chapterDetailsRepo.save(chapterDetails);
		} else if ("TOPIC".equals(entityType)) {
			TopicDetails topic = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndId(Long.valueOf(classId),
					Long.valueOf(subjectId), Long.valueOf(chapterId), Long.valueOf(entityId));
			topic.setIcon(fileDownloadUri);
			topicDetailsRepo.save(topic);
		}

		UploadFileResponse uploadRes = new UploadFileResponse();
		uploadRes.setFileName(fileName);
		uploadRes.setFileDownloadUri(fileDownloadUri);
		uploadRes.setFileType(file.getContentType());
		uploadRes.setSize(file.getSize());
		return uploadRes;
	}
	
	
	
	@PostMapping("/uploadProfileImage")
	public UploadFileResponse uploadFileForClass(@RequestParam("file") MultipartFile file) {
		String fileName = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/downloadFile/")
				.path(fileName).toUriString();

		UploadFileResponse uploadRes = new UploadFileResponse();
		uploadRes.setFileName(fileName);
		uploadRes.setFileDownloadUri(fileDownloadUri);
		uploadRes.setFileType(file.getContentType());
		uploadRes.setSize(file.getSize());
		return uploadRes;
	}
	
	

	@PostMapping("/uploadVideo")
	public UploadFileResponse uploadVideoFile(@RequestParam("file") MultipartFile file) {
		String fileName = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/downloadFile/")
				.path(fileName).toUriString();

		UploadFileResponse uploadRes = new UploadFileResponse();
		uploadRes.setFileName(fileName);
		uploadRes.setFileDownloadUri(fileDownloadUri);
		uploadRes.setFileType(file.getContentType());
		uploadRes.setSize(file.getSize());
		return uploadRes;
	}
		
	

	@GetMapping("/downloadFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = fileStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}
