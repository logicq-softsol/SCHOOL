import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: "upload-image",
    templateUrl: "upload-image.html"
  })
  export class ImageUploadDialog {
    file: File;
    uploadImageEmmiter = new EventEmitter();
    imageChangedEvent: any = "";
    croppedImage: any = "";
  
    constructor(public dialogRef: MatDialogRef<ImageUploadDialog>) { }
  
    onFileChanged(event) {
      this.imageChangedEvent = event;
      this.file = event.target.files[0];
      //this.uploadImageEmmiter.emit( this.file);
      // this.dialogRef.close();
    }
    
    imageCropped(image: string) {
      this.croppedImage = image;
    }
    imageLoaded() {
      // show cropper
    }
    loadImageFailed() {
      // show message
    }
    confirmUpload() {
      this.uploadImageEmmiter.emit(this.file);
      this.dialogRef.close();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }