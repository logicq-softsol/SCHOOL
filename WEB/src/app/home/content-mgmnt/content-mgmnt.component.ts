import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { HomeService } from '../service/home.service';
import { TypeDetails } from '../model/type-details';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserDetail } from 'src/app/public/model/user-detail';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';

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

  constructor(private homeService: HomeService, private authService: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });

    this.homeService.getClassDetails().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });
  }




  classSetupDetailsDialog(operationType: string): void {
    const dialogRef = this.dialog.open(ClassSetupDialog, {
      width: '600px',
      data: {
        type: operationType,
        classSetup: this.classSetup
      }
    });

    dialogRef.componentInstance.classesEmmiter.subscribe((menu) => {
      // this.snackMessage = 'ADDED SUCCESSFULLY!!!';
    });

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

