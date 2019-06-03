import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';
import { UserDetail } from '../../../public/model/user-detail';
import { ClassSetupDetail } from '../../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../../public/model/chapter-setup-detail';
import { TopicDetail } from '../../../public/model/topic-detail';
import { AuthenticationService } from '../../../services/authentication.service';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { Favorites } from '../../../public/model/favorite';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-content-topic',
  templateUrl: './topic.html',
  styleUrls: ['./topic.scss']
})
export class TopicComponent implements OnInit {

  user: UserDetail = new UserDetail();
  classList: ClassSetupDetail[] = [];
  classSetup: ClassSetupDetail = new ClassSetupDetail();

  classSubjectList: SubjectSetupDetail[] = [];
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();

  chapterList: ChapterSetupDetail[] = [];
  chapter: ChapterSetupDetail = new ChapterSetupDetail();

  topicList: TopicDetail[] = [];
  topic: TopicDetail = new TopicDetail();

  favorites: Favorites[] = [];
  favTopicList: TopicDetail[] = [];


  classdisplayName: any;
  subjectdisplayName: any;
  chapterdisplayName: any;
  displayView: any;


  constructor(
    private contentMgmntService: ContentMgmntService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;

    });

    this.contentMgmntService.getClassSetupDetail().subscribe((data: ClassSetupDetail) => {
      this.classSetup = data;
      this.classdisplayName = data.displayName;
    });


    this.contentMgmntService.getSubjectDetail().subscribe((data: SubjectSetupDetail) => {
      this.subjectSetup = data;
      this.subjectdisplayName = data.displayName;
    });



    this.contentMgmntService.getChapterSetupDetail().subscribe((data: ChapterSetupDetail) => {
      this.chapter = data;
      this.chapterdisplayName = data.displayName;
      this.contentMgmntService.getTopicListForChapterForSubjectAndClass(this.chapter.classId, this.chapter.subjectId, this.chapter.id).subscribe((tdata: TopicDetail[]) => {
        this.topicList = tdata;
      });

    });

    this.contentMgmntService.getClassList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });

    this.contentMgmntService.getSubjectList().subscribe((data: SubjectSetupDetail[]) => {
      this.classSubjectList = data;
    });
    this.contentMgmntService.getChapterList().subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
    });

  }


  viewMyFavorites() {

  }


  goToHome() {
    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });
  }


  onClassChange(classdisplayName) {
    let classDetail: ClassSetupDetail = this.classList.find(x => x.displayName == classdisplayName);
    this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
      this.classSubjectList = data;
      this.contentMgmntService.changeClassSetupDetail(classDetail);
      this.contentMgmntService.changeSubjectList(data);
    });
  }


  onSubjectChange(subjectdisplayName) {
    let subject: SubjectSetupDetail = this.classSubjectList.find(x => x.displayName == subjectdisplayName);
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
      this.contentMgmntService.changeSubjectDetail(subject);
      this.contentMgmntService.changeChapterList(data);
    });
  }

  onChapterChange(chapterdisplayName) {
    let chapter: ChapterSetupDetail = this.chapterList.find(x => x.displayName == chapterdisplayName);
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.chapter = chapter;
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(this.chapter.classId, this.chapter.subjectId, this.chapter.id).subscribe((tdata: TopicDetail[]) => {
      this.topicList = tdata;
    });


  }


  searchTopicDetails() {
    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(this.chapter.classId, this.chapter.subjectId, this.chapter.id).subscribe((tdata: TopicDetail[]) => {
      this.topicList = tdata;
    });
  }

  viewSubjectListForClass(value) {
    this.onClassChange(value);
    this.displayView = 'SUBJECT';
  }

  viewChapterListForSubject(value) {
    this.onSubjectChange(value);
    this.displayView = 'CHAPTER';
  }

  viewTopicListForChapter(value) {
    this.onChapterChange(value);
    this.displayView = 'TOPIC';
  }




  markFavorites(topic: TopicDetail) {
    let favorite: Favorites = new Favorites();
    favorite.type = "TOPIC";
    favorite.typeValue = topic.id;
    favorite.displayName = topic.displayName;
    favorite.description = topic.description;
    favorite.url = topic.playFileURL;
    favorite.icon = topic.icon;

    this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Topic " + topic.displayName + " marked favorite.", "CLOSE");
    });
  }


  removeFavorites(fav: Favorites) {
    this.contentMgmntService.removeFavorites(fav.type, fav.typeValue).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Topic  remove from your favorite.", "CLOSE");
    });
  }


  playLessonForTopic(topic: TopicDetail) {
    this.contentMgmntService.playLesson(topic).subscribe((data) => {
      let file = new Blob([data], { type: 'video/mp4' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }



  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}






