import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: "upload-video",
    templateUrl: "upload-video.html"
  })
  export class VideoUploadDialog {
    file: File;
    uploadImageEmmiter = new EventEmitter();
    imageChangedEvent: any = "";
    croppedImage: any = "";
  
    constructor(public dialogRef: MatDialogRef<VideoUploadDialog>) { }
  
    onFileChanged(event) {
      this.imageChangedEvent = event;
      this.file = event.target.files[0];
    }
    
    confirmUpload() {
      this.uploadImageEmmiter.emit(this.file);
      this.dialogRef.close();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }