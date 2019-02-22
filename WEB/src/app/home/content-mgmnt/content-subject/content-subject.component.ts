import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { ClassSetupDetail } from '../../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../../public/model/subject-setup-detail';
import { ContentMgmntService } from '../../../home/service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetail } from '../../../public/model/user-detail';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-content-subject',
  templateUrl: './content-subject.component.html',
  styleUrls: ['./content-subject.component.scss']
})
export class ContentSubjectComponent implements OnInit {

  classDetail: ClassSetupDetail = new ClassSetupDetail();
  classList: ClassSetupDetail[] = [];

  subjectList: SubjectSetupDetail[] = [];
  subjectDetail: SubjectSetupDetail = new SubjectSetupDetail();

  user: UserDetail = new UserDetail();

  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, public dialog: MatDialog, public snackBar: MatSnackBar) {


    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });

    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;

    });

    this.contentMgmntService.getClassSetupDetail().subscribe((classDetail: ClassSetupDetail) => {
      this.classDetail = classDetail;
      this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((subjectList: SubjectSetupDetail[]) => {
        this.subjectList = subjectList;
      });
    });


  }

  ngOnInit() {
  }


  addSubjectDetails() {
    const dialogRef = this.dialog.open(SubjectDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        subjectDetail: null
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      //   subjectDetail.icon = this.imageUrl;
      subjectDetail.type = "SUBJECT";
      subjectDetail.classId = this.classDetail.id;
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open(" Subjject Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(this.classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
          this.subjectList = data;
        });
      });
    });
  }

  editSubjectDetail(subject: SubjectSetupDetail) {
    const dialogRef = this.dialog.open(SubjectDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        subjectDetail: subject
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      //   subjectDetail.icon = this.imageUrl;
      subjectDetail.type = "SUBJECT";
      subjectDetail.classId = this.classDetail.id;
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open(" Subjject Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(this.classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
          this.subjectList = data;
        });
      });
    });

  }

  deleteSubjectDetail(subject: SubjectSetupDetail) {
    const dialogRef = this.dialog.open(SubjectDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        subjectDetail: subject
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      //   subjectDetail.icon = this.imageUrl;
      subjectDetail.type = "SUBJECT";
      subjectDetail.classId = this.classDetail.id;
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open(" Subjject Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(this.classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
          this.subjectList = data;
        });
      });
    });
  }

  viewChapterList(subject: SubjectSetupDetail) {

  }




  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

}



@Component({
  selector: 'subject-setup-dialog',
  templateUrl: 'subject-setup-dialog.html',
  styleUrls: ['./content-subject.component.scss']
})
export class SubjectDetailDialog {
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();
  subjectEventEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  constructor(public dialogRef: MatDialogRef<SubjectDetailDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.operationType = data.type;
    if ("ADD" == data.type) {
      this.subjectSetup = new SubjectSetupDetail();
    } else {
      this.subjectSetup = data.subjectDetail;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveClassChange() {
    if ("ADD" == this.operationType) {
      if (this.subjectSetup.name == null) {
        this.subjectSetup.name = this.subjectSetup.displayName.replace(/\s/g, "");
      }
    }
    this.subjectEventEmmiter.emit(this.subjectSetup);
    this.onNoClick();
  }

}
