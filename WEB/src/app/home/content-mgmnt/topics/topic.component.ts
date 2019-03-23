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

  selectImage: File;
  imageUrl: string;

  className: string;
  subjectName: string;
  chapterName: string;
  displayView: string = 'TOPIC';

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
      this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
        this.classList = data;
      });
    });

    this.contentMgmntService.getClassSetupDetail().subscribe((classSet: ClassSetupDetail) => {
      this.classSetup = classSet;
      this.className = classSet.displayName;
      this.contentMgmntService.getSubjectListForClass(this.classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
        this.classSubjectList = subjectList;
      });

      this.contentMgmntService.getSubjectDetail().subscribe((subject: SubjectSetupDetail) => {
        this.subjectSetup = subject;
        this.subjectName = subject.displayName;
        this.contentMgmntService.getChapterListForSubjectAndClass(this.subjectSetup.classId, this.subjectSetup.id).subscribe((chapterList: ChapterSetupDetail[]) => {
          this.chapterList = chapterList;
        });
      });

      this.contentMgmntService.getChapterSetupDetail().subscribe((chapter: ChapterSetupDetail) => {
        this.chapter = chapter;
        this.chapterName = chapter.displayName;
        this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.id).subscribe((topics: TopicDetail[]) => {
          this.topicList = topics;
        });
      });
    });

  }

  viewMyFavorites() {
    this.favTopicList=[];
    this.displayView = 'FAVTOPIC';
    this.contentMgmntService.getFavorites().subscribe((favorites: Favorites[]) => {
      this.favorites = favorites;
      for (let fav of this.favorites) {
        let topic: TopicDetail = this.topicList.find(x => x.id == fav.typeValue);
        this.favTopicList.push(topic);
      }
    });
  }


  goToHome() {
    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });
    this.displayView = 'CLASS';
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

  onClassChange(value) {
    let classDetail: ClassSetupDetail = this.classList.find(x => x.displayName == value);
    this.className = classDetail.displayName;
    this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
      this.classSubjectList = data;
      this.topicList = [];
    });
  }


  onSubjectChange(value) {
    let subject: SubjectSetupDetail = this.classSubjectList.find(x => x.displayName == value);
    this.subjectName = subject.displayName;
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
      this.topicList = [];
    });
  }

  onChapterChange(value) {
    let chapter: ChapterSetupDetail = this.chapterList.find(x => x.displayName == value);
    this.chapterName = chapter.displayName;
    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.id).subscribe((topics: TopicDetail[]) => {
      this.topicList = [];
      this.topicList = topics;
    });
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






