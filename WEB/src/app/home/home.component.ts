import { Component, OnInit, EventEmitter, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserDetail } from '../public/model/user-detail';
import { ContentMgmntService } from '../home/service/content-mgmnt.service';
import { TopicDetail } from 'src/app/public/model/topic-detail';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';
import { Favorites } from '../public/model/favorite';
import { VideoDialog } from './content-mgmnt/topics/topic.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserDetail = new UserDetail();
  today: Date = new Date();

  topicList: TopicDetail[] = [];
  topic: TopicDetail = new TopicDetail();
  topicDisplayName: any;
  timeLeft: any;
  schoolType: string;

  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) {
    if (this.authService.isAuthenticate) {
      this.authService.getUserDetail().subscribe((user: UserDetail) => {
        this.user = user;
        this.contentMgmntService.loadSchoolType().subscribe(typeData => {
          this.schoolType = typeData['type'];
          this.contentMgmntService.changeSchoolType(this.schoolType);
        });
        this.router.navigate(['/home/teacher']);
        this.contentMgmntService.changeContentDisplayView('SEARCH');
      });
    }
  }

  ngOnInit() {
    this.contentMgmntService.getAllTopics().subscribe((topics: TopicDetail[]) => {
      this.topicList = topics;
    })

  }

  navigateHome() {
    this.router.navigate(['/home/teacher']);
  }

  logout() {
    this.router.navigate(['login']);
  }

  setupDayZero() {
    this.contentMgmntService.setupDayZeroForSchool().subscribe(data => {
      this.openSnackBar("All Class,Subject,Chapter,Topic Setup sucessfully", "SUCESS");
    });
  }

  gotToHomepage() {
    this.router.navigate(['/home/teacher']);
  }
  viewSessionReport() {
    this.contentMgmntService.changeContentDisplayView('SESSION');
    this.router.navigate(['/home/teacher/session']);
  }


  viewProfile() {
    this.contentMgmntService.changeContentDisplayView('PROFILE');
    this.router.navigate(['/home/teacher']);
  }

  searchTopicDetails() {

  }

  onTopicChange(topicDisplayName: any) {
    let topic: TopicDetail = this.topicList.find(x => x.displayName == topicDisplayName);
    const dialogRef = this.dialog.open(TopicDisplayDialog, {
      width: '600px',
      data: {
        topic: topic
      }
    });

    dialogRef.componentInstance.topicEVentEmitter.subscribe((topic: TopicDetail) => {
      if (null != topic) {
        let favorite: Favorites = new Favorites();
        favorite.type = "TOPIC";
        favorite.typeValue = topic.id;
        favorite.displayName = topic.displayName;
        favorite.description = topic.description;
        favorite.url = topic.playFileURL;
        favorite.icon = topic.icon;

        this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
          this.openSnackBar("Topic " + topic.displayName + " marked favorite.", "CLOSE");
        });
      }

    });

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
  clear() {
    this.topicDisplayName = null;
  }

  setupRemainTime() {
    var oneDay = 24 * 60 * 60 * 1000;
    this.contentMgmntService.getRemaingLicenseDays().subscribe((data: any) => {
      //   var firstDate = new Date(data.activationDate);
      // var secondDate = new Date(data.expiryDate);
      // var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
      this.timeLeft = data.remaningDays;
    });

  }


}



@Component({
  selector: 'topic-view-dialog',
  templateUrl: 'key-word-search-dialog.html',
  styleUrls: ['./home.component.scss']
})
export class TopicDisplayDialog {
  topic: TopicDetail = new TopicDetail();
  topicEVentEmitter = new EventEmitter();
  classSetupDetail: ClassSetupDetail = new ClassSetupDetail();
  subjectDetail: SubjectSetupDetail = new SubjectSetupDetail();
  ChapterSetupDetail: ChapterSetupDetail = new ChapterSetupDetail();

  constructor(public dialogRef: MatDialogRef<TopicDisplayDialog>, @Inject(MAT_DIALOG_DATA) private data: any, private contentMgmntService: ContentMgmntService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.topic = data.topic;
    this.contentMgmntService.getClassDetails(this.topic.classId).subscribe((classDet: ClassSetupDetail) => {
      this.contentMgmntService.changeClassSetupDetail(classDet);
      this.classSetupDetail = classDet;
    });

    this.contentMgmntService.getSubjectAndClass(this.topic.classId, this.topic.subjectId).subscribe((subjectDe: SubjectSetupDetail) => {
      this.contentMgmntService.changeSubjectDetail(subjectDe);
      this.subjectDetail = subjectDe;
    });
    this.contentMgmntService.getChapterForClassAndSubject(this.topic.classId, this.topic.subjectId, this.topic.chapterId).subscribe((chapter: ChapterSetupDetail) => {
      this.contentMgmntService.changeChapterSetupDetail(chapter);
      this.ChapterSetupDetail = chapter;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  markFavorites(topic: TopicDetail) {
    this.topicEVentEmitter.emit(topic);
  }

  playLessonForTopic(topic: TopicDetail) {
    this.dialogRef.close();
    this.contentMgmntService.playLesson(topic).subscribe((data) => {
      let file = new Blob([data], { type: 'video/mp4' });
      if (file.size > 0) {
        const dialogRef = this.dialog.open(VideoDialog, {
          width: '600px',
          hasBackdrop: false,
          data: {
            url: URL.createObjectURL(file),
            topic: topic
          }
        });
      } else {
        this.openErrorSnackBar("No Video exist with content.", "CLOSE");
      }

    });
  }

  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }


}