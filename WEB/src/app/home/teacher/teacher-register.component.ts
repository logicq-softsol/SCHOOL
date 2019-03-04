import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginDetail } from '../../public/model/login-detail';
import { UserDetail } from '../../public/model/user-detail';
import { HomeService } from '../service/home.service';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ContentMgmntService } from '../service/content-mgmnt.service';
import { TopicDetail } from 'src/app/public/model/topic-detail';



@Component({
  selector: 'app-register-teacher',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.scss']
})
export class TeacherRegisterComponent implements OnInit {

  loginUser: UserDetail;

  selectImage: File;
  imageUrl: string;

  regUserList: UserDetail[] = [];

  classList: ClassSetupDetail[] = [];
  classSetup: ClassSetupDetail = new ClassSetupDetail();

  classSubjectList: SubjectSetupDetail[] = [];
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();


  constructor(private authService: AuthenticationService,    private contentMgmntService: ContentMgmntService, private homeService: HomeService, public dialogProfileImage: MatDialog, public snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.authService.isAuthenticate) {
      this.authService.getUserDetail().subscribe((user: UserDetail) => {
        this.loginUser = user;
      });
      this.homeService.findUsers().subscribe((users: UserDetail[]) => {
        this.regUserList = users
      });
      this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
        this.classList = data;
      });
    }
  }



  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
    });
  }

  viewTopicList(){

  }

  registerUser() {
    const dialogRef = this.dialog.open(UserRegDialog, {
      width: '600px',
      data: {
        type: "ADD",
        loginDetail: null
      }
    });

    dialogRef.componentInstance.userRegEmmiter.subscribe((login: LoginDetail) => {
      this.homeService.registerUser(login).subscribe((data: any) => {
        this.openSnackBar(data.message, data.messageCode);
      });
    });

  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}





@Component({
  selector: 'user-reg-dialog',
  templateUrl: 'user-register-dialog.html',
  styleUrls: ['./teacher-register.component.scss']
})
export class UserRegDialog {
  login: LoginDetail = new LoginDetail();
  user: UserDetail = new UserDetail();
  userRegEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  constructor(public dialogRef: MatDialogRef<UserRegDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.operationType = data.type;
    if ("ADD" == data.type) {
      this.login = new LoginDetail();
      this.login.user = new UserDetail();
    } else {
      this.login = data.loginDetail;
      this.user = this.login.user;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUserDetail() {
    this.login.user = this.user;
    this.userRegEmmiter.emit(this.login);
    this.onNoClick();
  }

}