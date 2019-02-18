import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { HomeService } from '../service/home.service';
import { TypeDetails } from '../model/type-details';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetail } from 'src/app/public/model/user-detail';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';
import { ContentMgmntService } from 'src/app/home/service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-content-mgmnt',
  templateUrl: './content-mgmnt.component.html',
  styleUrls: ['./content-mgmnt.component.scss']
})
export class ContentMgmntComponent implements OnInit {

  classList: ClassSetupDetail[] = [];
  classSetup: ClassSetupDetail = new ClassSetupDetail();

  subjectList: SubjectSetupDetail[] = [];
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();

  chapterList: ChapterSetupDetail[] = [];
  chapterDetails: ChapterSetupDetail = new ChapterSetupDetail();

  user: UserDetail = new UserDetail();

  enableClass: boolean = true;
  selectImage: File;
  imageUrl: string;

  constructor(private homeService: HomeService,
    private contentMgmntService: ContentMgmntService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });

    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });
  }

  viewYourWorkSpace(classSetup: ClassSetupDetail) {

  }



  editClassDetails(classSetup: ClassSetupDetail) {
    const dialogRef = this.dialog.open(ClassSetupDialog, {
      width: '600px',
      data: {
        type: "EDIT",
        classDetail: classSetup
      }
    });

    dialogRef.componentInstance.classesEmmiter.subscribe((menu) => {
      // this.snackMessage = 'ADDED SUCCESSFULLY!!!';
    });
  }

  deleteClassDetails(classSetup: ClassSetupDetail) {
    const dialogRef = this.dialog.open(ClassSetupDialog, {
      width: '600px',
      data: {
        type: "DELETE",
        classDetail: classSetup
      }
    });

    dialogRef.componentInstance.classesEmmiter.subscribe((menu) => {
      // this.snackMessage = 'ADDED SUCCESSFULLY!!!';
    });
  }


  addClassDetails() {
    const dialogRef = this.dialog.open(ClassSetupDialog, {
      width: '600px',
      data: {
        type: "ADD",
        classDetail: null
      }
    });

    dialogRef.componentInstance.classesEmmiter.subscribe((classDetails: ClassSetupDetail) => {
      classDetails.icon = this.imageUrl;
      this.contentMgmntService.setupClassDetails(classDetails).subscribe((classDetails: ClassSetupDetail) => {
        this.snackBar.open(" Class Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
          this.classList = data;
        });
      });
    });
  }

  onChangeImageUpload() {
    const dialogRef = this.dialogProfileImage.open(
      ProfileImageDialog,
      {
        width: "600px"
      }
    );
    dialogRef.componentInstance.uploadImageEmmiter.subscribe(data => {
      this.selectImage = data;
      this.homeService
        .uploadProfileImage(this.selectImage)
        .subscribe((data: any) => {
          this.imageUrl = data.fileDownloadUri;
        });
    });

    dialogRef.afterClosed().subscribe(result => { });
  }





  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}



@Component({
  selector: "profile-image",
  templateUrl: "profile-image.html",
  styleUrls: ["./content-mgmnt.component.scss"]
})
export class ProfileImageDialog {
  file: File;
  uploadImageEmmiter = new EventEmitter();
  imageChangedEvent: any = "";
  croppedImage: any = "";

  constructor(public dialogRef: MatDialogRef<ProfileImageDialog>) { }

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


@Component({
  selector: 'class-setup-dialog',
  templateUrl: 'class-setup-dialog.html',
  styleUrls: ['./content-mgmnt.component.scss']
})
export class ClassSetupDialog {
  classSetup: ClassSetupDetail;
  classesEmmiter = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ClassSetupDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    if ("ADD" == data.type) {
      this.classSetup = new ClassSetupDetail();
    }
    if ("EDIT" == data.type) {
      this.classSetup = data.classSetup;
    }
    if ("DELETE" == data.type) {
      this.classSetup = data.classSetup;
    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClass() {
    this.classesEmmiter.emit(this.classSetup);
    this.onNoClick();
  }

}




@Component({
  selector: 'subject-setup-dialog',
  templateUrl: 'subject-setup-dialog.html',
  styleUrls: ['./content-mgmnt.component.scss']
})
export class SubjectSetupDialog {
  subjectSetup: SubjectSetupDetail;
  subjectEmmiter = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<SubjectSetupDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    if ("ADD" == data.type) {
      this.subjectSetup = new SubjectSetupDetail();
    }
    if ("EDIT" == data.type) {
      this.subjectSetup = data.subjectSetup;
    }
    if ("DELETE" == data.type) {
      this.subjectSetup = data.subjectSetup;
    }


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClass() {
    this.subjectEmmiter.emit(this.subjectSetup);
    this.onNoClick();
  }

}

