import { Component, OnInit, EventEmitter, Inject,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: "upload-video",
    templateUrl: "upload-video.html"
  })
  export class VideoUploadDialog {

    @ViewChild('fileInput') fileInput;
    uploadVideoEmmiter = new EventEmitter();
  
    constructor(public dialogRef: MatDialogRef<VideoUploadDialog>) { }
  
    onFileChanged(event) {
    
    }
    
    confirmUpload() {
      this.uploadVideoEmmiter.emit(this.fileInput);
      this.dialogRef.close();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }