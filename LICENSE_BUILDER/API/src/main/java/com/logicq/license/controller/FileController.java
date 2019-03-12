package com.logicq.license.controller;

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

import com.logicq.license.service.FileStorageService;
import com.logicq.license.vo.UploadFileResponse;

@RestController
@RequestMapping("/api")
public class FileController {
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileStorageService fileStorageService;

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
