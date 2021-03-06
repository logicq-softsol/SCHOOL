import { Component, OnInit, EventEmitter, Inject, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../service/home.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDetail } from '../../public/model/user-detail';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassSetupDetail } from '../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../public/model/chapter-setup-detail';
import { ContentMgmntService } from '../../home/service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Favorites } from '../../public/model/favorite';
import { TopicDetail } from '../../public/model/topic-detail';
import { VideoDialog, PPTDialog } from './topics/topic.component';
declare var jsPDF: any;

@Component({
  selector: 'app-content-mgmnt',
  templateUrl: './content-mgmnt.component.html',
  styleUrls: ['./content-mgmnt.component.scss']
})
export class ContentMgmntComponent implements OnInit {

  @ViewChild('sessionTable') sessionTable: ElementRef;

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

  selectImage: File;
  imageUrl: string;

  animationtopicList: TopicDetail[] = [];
  ppttopicList: TopicDetail[] = [];
  pdftopicList: TopicDetail[] = [];

  classdisplayName: any;
  subjectdisplayName: any;
  chapterdisplayName: any;
  displayView: any;
  sessionData: any[] = [];
  topicdisplayView: string = "";



  constructor(private homeService: HomeService,
    private contentMgmntService: ContentMgmntService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
      this.viewReport(7);
    });

    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
      this.contentMgmntService.changeClassList(data);
    });

    this.contentMgmntService.getFavorites().subscribe((favorites: Favorites[]) => {
      this.favorites = favorites;
    });

    this.contentMgmntService.getContentDisplayView().subscribe((view: any) => {
      this.displayView = view;
      if ('TOPIC' === this.displayView) {
        this.contentMgmntService.getTopicdisplayView().subscribe((tview: any) => {
          this.topicdisplayView = tview;
        });
      }

    });

  }


  gotToHomepage() {
    this.router.navigate(['/home/teacher']);
    this.classSubjectList = [];
    this.chapterList = [];
    this.topicList = [];

  }



  onClassChange(classdisplayName) {
    let classDetail: ClassSetupDetail = this.classList.find(x => x.displayName == classdisplayName);
    this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
      this.classSubjectList = data;
      this.contentMgmntService.changeClassSetupDetail(classDetail);
      this.contentMgmntService.changeSubjectList(data);
      this.contentMgmntService.changeDisplayView('SUBJECT');
      this.chapterList = [];
      this.topicList = [];
    });
  }

  viewReport(interval) {
    if (this.user.role == 'ADMIN') {
      this.contentMgmntService.getAllSessions(interval).subscribe((data: any[]) => {
        this.sessionData = data;
      });
    } else {
      this.contentMgmntService.getUserSession(interval).subscribe((data: any[]) => {
        this.sessionData = data;
      });
    }
  }

  downloadReport() {
    let doc = new jsPDF();
    doc.page = 1;
    doc.autoTable({ html: '#sessionTable' });
    this.footer(doc);
    doc.save('SessionReport.pdf');
  }

  footer(doc) {
    doc.text(150, 285, 'Copyright, 2019  EduSure Rights Reserved,Terms and conditions');
    doc.page++;
  };
  onSubjectChange(subjectdisplayName) {
    let subject: SubjectSetupDetail = this.classSubjectList.find(x => x.displayName == subjectdisplayName);
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
      this.contentMgmntService.changeSubjectDetail(subject);
      this.contentMgmntService.changeChapterList(data);
      this.contentMgmntService.changeDisplayView('CHAPTER');
      this.topicList = [];
    });
  }

  onChapterChange(chapterdisplayName) {
    let chapter: ChapterSetupDetail = this.chapterList.find(x => x.displayName == chapterdisplayName);
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.chapter = chapter;
    this.contentMgmntService.changeDisplayView('TOPIC');
    this.showTopicList(this.chapter);

  }

  searchTopicDetails() {
    this.router.navigate(['/home/teacher/topics']);
  }

  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
      this.contentMgmntService.changeSubjectDetail(this.subjectSetup);
      this.viewChapterList(this.subjectSetup);
    });
  }

  viewChapterList(subject: SubjectSetupDetail) {
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
      this.chapterList = chapters;
      this.contentMgmntService.changeChapterSetupDetail(this.chapter);
      this.showTopicList(this.chapter);
    });
  }

  showTopicList(chapter: ChapterSetupDetail) {
    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.id).subscribe((topics: TopicDetail[]) => {
      this.topicList = topics;
      if (this.topicList.length > 0) {
        this.animationtopicList = [];
        this.ppttopicList = [];
        this.pdftopicList = [];
        this.topicList.forEach(topic => {
          if ('VIDEO' == topic.contentType) {
            this.animationtopicList.push(topic);
          }
          else if ('PPT' == topic.contentType) {
            this.ppttopicList.push(topic);
          }
          else if ('PDF' == topic.contentType) {
            this.pdftopicList.push(topic);
          }
        });
        if (this.animationtopicList.length > 0) {
          this.topicdisplayView = 'TOPIC#VIDEO';
        } else if (this.ppttopicList.length > 0) {
          this.topicdisplayView = 'TOPIC#PPT';
        } else if (this.pdftopicList.length > 0) {
          this.topicdisplayView = 'TOPIC#PDF';
        } else {
          this.topicdisplayView = 'TOPIC#VIDEO';
        }
      }

    });
  }


  viewSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.changeClassSetupDetail(classSetup);
  }



  playLessonForTopic(fave: Favorites) {
    if ('VIDEO' == fave.topicDetails.contentType) {
      this.contentMgmntService.playLesson(fave.topicDetails).subscribe((data) => {
        let file = new Blob([data], { type: 'video/mp4' });
        if (file.size > 0) {
          const dialogRef = this.dialog.open(VideoDialog, {
            width: '600px',
            hasBackdrop: false,
            data: {
              url: URL.createObjectURL(file),
              topic: fave.topicDetails
            }
          });
        } else {
          this.openErrorSnackBar("No Video exist with content.", "CLOSE");
        }

      });
    }
    if ('PPT' == fave.topicDetails.contentType || 'PDF' == fave.topicDetails.contentType) {
      this.contentMgmntService.playLesson(fave.topicDetails).subscribe((data) => {
        let file = new Blob([data], { type: 'application/pdf' });
        if (file.size > 0) {
          const dialogRef = this.dialog.open(PPTDialog, {
            width: '600px',
            hasBackdrop: false,
            data: {
              url: URL.createObjectURL(file),
              topic: fave.topicDetails
            }
          });
        } else {
          this.openErrorSnackBar("No PDF exist with content.", "CLOSE");
        }

      });
    }
  }

  markFavorites(topic: TopicDetail) {
    let favorite: Favorites = new Favorites();
    favorite.classId = topic.classId;
    favorite.subjectId = topic.subjectId;
    favorite.chapterId = topic.chapterId;
    favorite.topicId = topic.id;
    favorite.typeValue = 'TOPIC';
    this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Mark Favorties for  " + topic.displayName + " sucessfully.", "CLOSE");
    });
  }



  removeFavorites(fav: Favorites) {
    this.contentMgmntService.removeFavorites(fav.id).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Topic  remove from your favorite.", "CLOSE");
      this.contentMgmntService.getFavorites().subscribe((favorites: Favorites[]) => {
        this.favorites = favorites;
      });
    });
  }


  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
  classClear() {
    this.classdisplayName = null;
  }
  subjectClear() {
    this.subjectdisplayName = null;
  }
  chapterClear() {
    this.chapterdisplayName = null;
  }
}






