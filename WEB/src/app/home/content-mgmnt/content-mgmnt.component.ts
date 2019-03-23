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
import { ImageUploadDialog } from './upload-file/upload-image';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Favorites } from '../../public/model/favorite';
import { TopicDetail } from '../../public/model/topic-detail';

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

  className: string;
  subjectName: string;
  chapterName: string;



  constructor(private homeService: HomeService,
    private contentMgmntService: ContentMgmntService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });

    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
      this.classSetup = this.classList[0];
      this.className = this.classSetup.displayName;
      this.onDefaultClassChange(this.classSetup);
    });

    this.contentMgmntService.getFavorites().subscribe((favorites: Favorites[]) => {
      this.favorites = favorites;
    });

  }


  gotToHomepage() {
    if (this.user.role == 'TEACHER') {
      this.router.navigate(['/home/teacher']);
    }
  }


  onDefaultClassChange(classSetup: ClassSetupDetail) {
    this.contentMgmntService.changeClassSetupDetail(classSetup);
    this.showClassSubjectList(classSetup);
  }


  onClassChange(value) {
    let classDetail: ClassSetupDetail = this.classList.find(x => x.displayName == value);
    this.contentMgmntService.changeClassSetupDetail(classDetail);
    this.classSetup=classDetail;
    this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
      this.classSubjectList = data;
    });
  }


  onSubjectChange(value) {
    let subject: SubjectSetupDetail = this.classSubjectList.find(x => x.displayName == value);
    this.contentMgmntService.changeSubjectDetail(subject);
    this.subjectSetup=subject;
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
    });
  }

  onChapterChange(value) {
    let chapter: ChapterSetupDetail = this.chapterList.find(x => x.displayName == value);
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.chapter=chapter;

  }

  searchTopicDetails() {
    this.contentMgmntService.changeClassSetupDetail(this.classSetup);
    this.contentMgmntService.changeSubjectDetail(this.subjectSetup);
    this.contentMgmntService.changeChapterSetupDetail(this.chapter);
  
    if (this.user.role == 'TEACHER') {
      this.router.navigate(['/home/teacher/topics']);
    }
  }

  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
      this.subjectSetup = this.classSubjectList[0];
      this.subjectName = this.subjectSetup.displayName;
      this.contentMgmntService.changeSubjectDetail(this.subjectSetup);
      this.viewChapterList(this.subjectSetup);
    });
  }

  viewChapterList(subject: SubjectSetupDetail) {
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
      this.chapterList = chapters;
      this.chapter = this.chapterList[0];
      this.chapterName = this.chapter.displayName;
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
    });
  }


  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}






