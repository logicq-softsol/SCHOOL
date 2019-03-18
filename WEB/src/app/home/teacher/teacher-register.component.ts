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
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';



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

  chapterList: ChapterSetupDetail[] = [];
  chapter: ChapterSetupDetail = new ChapterSetupDetail();

   topicList:TopicDetail[]=[];
   topic:TopicDetail=new TopicDetail();


  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private homeService: HomeService, public dialogProfileImage: MatDialog, public snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }

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

  onClassChange(event) {
    let classDetails: ClassSetupDetail = this.classList.find(cls => cls.displayName == event);
    this.showClassSubjectList(classDetails);
  }

  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
    });
  }

  viewChapterList(subject:SubjectSetupDetail) {
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
      this.chapterList = chapters;
    });
  }

  showTopicList(chapter:ChapterSetupDetail){
    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId,chapter.subjectId,chapter.id).subscribe((topics:TopicDetail[])=>{
      this.topicList=topics;
    });
  }

  playTopic(topic:TopicDetail){
    this.contentMgmntService.playLesson().subscribe((data) => {
      let file = new Blob([data], { type: 'video/mp4' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}