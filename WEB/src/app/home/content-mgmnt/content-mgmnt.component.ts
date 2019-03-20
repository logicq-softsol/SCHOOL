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

  
  topicList:TopicDetail[]=[];
  topic:TopicDetail=new TopicDetail();

  selectImage: File;
  imageUrl: string;


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
      this.classSetup=this.classList[0];
      this.onClassChange(this.classSetup); 
    });

  }

  
  onClassChange(classSetup:ClassSetupDetail) {
    this.showClassSubjectList(classSetup);
  }


  
  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
      this.subjectSetup= this.classSubjectList[0];
      this.viewChapterList(  this.subjectSetup);
    });
  }

  viewChapterList(subject:SubjectSetupDetail) {
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
      this.chapterList = chapters;
      this.chapter=this.chapterList[0];
      this.showTopicList(this.chapter);
    });
  }

  showTopicList(chapter:ChapterSetupDetail){
    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId,chapter.subjectId,chapter.id).subscribe((topics:TopicDetail[])=>{
      this.topicList=topics;
    });
  }
  

  viewSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.changeClassSetupDetail(classSetup);
  }


  onChangeImage(classDet: ClassSetupDetail) {
    const dialogRef = this.dialogProfileImage.open(
      ImageUploadDialog,
      {
        width: "600px"
      }
    );
    dialogRef.componentInstance.uploadImageEmmiter.subscribe(data => {
      this.selectImage = data;
      this.homeService
        .uploadImagesForEntity(this.selectImage, classDet.id, 'CLASS')
        .subscribe((data: any) => {
          this.imageUrl = data.fileDownloadUri;
        });
    });

    dialogRef.afterClosed().subscribe(result => { });
  }


  markFavorites(classDet: ClassSetupDetail) {
    let favorite: Favorites = new Favorites();
    favorite.type = "CLASS";
    favorite.typeValue = classDet.id;
    this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Class " + classDet.displayName + " mark favorite.", "CLOSE");
    });
  }



  removeFavorites(classDet: ClassSetupDetail) {
    this.contentMgmntService.removeFavorites("CLASS", classDet.id).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Class " + classDet.displayName + " remove from your favorite.", "CLOSE");
    });
  }


  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}






