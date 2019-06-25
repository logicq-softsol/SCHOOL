import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
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
import { VideoDialog } from './topics/topic.component';

@Component({
  selector: 'app-content-mgmnt',
  templateUrl: './content-mgmnt.component.html',
  styleUrls: ['./content-mgmnt.component.scss']
})
export class ContentMgmntComponent implements OnInit {

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

  classdisplayName: any;
  subjectdisplayName: any;
  chapterdisplayName: any;
  displayView:any;
  sessionData;
  constructor(private homeService: HomeService,
    private contentMgmntService: ContentMgmntService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
   
    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
      if(this.user.role == 'ADMIN') {
        this.getAllSessions();
      }
      else {
        this.getSession();
      }
    });

    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
      this.contentMgmntService.changeClassList(data);
    });

    this.contentMgmntService.getFavorites().subscribe((favorites: Favorites[]) => {
      this.favorites = favorites;
    });

    this.contentMgmntService.getContentDisplayView().subscribe((view:any)=>{
          this.displayView=view;
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
    });
  }


  viewSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.changeClassSetupDetail(classSetup);
  }



  playLessonForTopic(fave: Favorites) {
    let topic: TopicDetail = new TopicDetail();
    topic.id = fave.typeValue
    this.contentMgmntService.playLesson(topic).subscribe((data) => {
      let file = new Blob([data], { type: 'video/mp4' });
      if (file.size > 0) {
        topic.displayName=fave.displayName;
        topic.description=fave.description;
        const dialogRef = this.dialog.open(VideoDialog, {
          width: '600px',
          hasBackdrop: false,
          data: {
            url: URL.createObjectURL(file),
            topic:topic
          }
        });
      } else {
        this.openErrorSnackBar("No Video exist with content.", "CLOSE");
      }
    });
  }

  markFavorites(classDet: ClassSetupDetail) {
    let favorite: Favorites = new Favorites();
    favorite.type = "CLASS";
    favorite.typeValue = classDet.id;
    this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Class " + classDet.displayName + " mark favorite.", "CLOSE");
    });
  }



  removeFavorites(fav: Favorites) {
    this.contentMgmntService.removeFavorites(fav.type, fav.typeValue).subscribe((fav: Favorites) => {
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
  getSession() {
    this.contentMgmntService.getUserSession().subscribe(data => {
      console.log('User session data: ', data);
      this.sessionData = data;
    });
  }
  getAllSessions() {
    this.contentMgmntService.getAllSessions().subscribe(data => {
      console.log('All session data: ', data);
      this.sessionData = data;
    });
  }
}






