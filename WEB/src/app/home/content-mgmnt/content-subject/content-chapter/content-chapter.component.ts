import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { ClassSetupDetail } from '../../../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../../../public/model/chapter-setup-detail';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ContentMgmntService } from '../../../../home/service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetail } from '../../../../public/model/user-detail';
import { Router } from '@angular/router';
import { ImageUploadDialog } from '../../../../home/content-mgmnt/upload-file/upload-image';
import { HomeService } from '../../../../home/service/home.service';
import { WorkSpaceDialog } from '../../workspace/work-space.component';
import { Favorites } from 'src/app/public/model/favorite';


@Component({
  selector: 'app-content-chapter',
  templateUrl: './content-chapter.component.html',
  styleUrls: ['./content-chapter.component.scss']
})
export class ContentChapterComponent implements OnInit {

  classSetupDetail:ClassSetupDetail=new ClassSetupDetail();
  subjectDetail: SubjectSetupDetail = new SubjectSetupDetail();

  chapter: ChapterSetupDetail = new ChapterSetupDetail();
  chapterList: ChapterSetupDetail[] = [];

  selectImage: File;
  imageUrl: string;

  constructor(private authService: AuthenticationService,
    private contentMgmntService: ContentMgmntService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogProfileImage: MatDialog,
    private homeService: HomeService) { }

  ngOnInit() {
    this.contentMgmntService.getClassSetupDetail().subscribe((classDetail:ClassSetupDetail)=>{
         this.classSetupDetail=classDetail;
    });
    this.contentMgmntService.getSubjectDetail().subscribe((subject: SubjectSetupDetail) => {
      this.subjectDetail=subject;
      this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
        this.chapterList = chapters;
      });
    });

  }

  markFavorites(chapter: ChapterSetupDetail) {
    let favorite: Favorites = new Favorites();
    favorite.type = "CHAPTER";
    favorite.typeValue = chapter.id;
    this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Chapter " + chapter.displayName + " mark favorite.", "CLOSE");
    });
  }



  removeFavorites(chapter: ChapterSetupDetail) {
    this.contentMgmntService.removeFavorites("CHAPTER", chapter.id).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Chapter " + chapter.displayName + " remove from your favorite.", "CLOSE");
    });
  }



  viewTopicist(chapter: ChapterSetupDetail) {
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.router.navigate(['/home/contentmgmnt/subject/chapter/topic']);
  }


  userYourWorkSpace(chapter: ChapterSetupDetail) {
    const dialogRef = this.dialog.open(WorkSpaceDialog, {
      width: '600px',
      data: {
        type: "ADD",
        chapterDetail: chapter
      }
    });

    dialogRef.componentInstance.workSpaceEmmiter.subscribe((workSpaceContent: any) => {

    });
  }


  onChangeImage(chapter: ChapterSetupDetail) {
    const dialogRef = this.dialogProfileImage.open(
      ImageUploadDialog,
      {
        width: "600px"
      }
    );
    dialogRef.componentInstance.uploadImageEmmiter.subscribe(data => {
      this.selectImage = data;
      this.homeService
        .uploadImagesForChapter(this.selectImage, chapter)
        .subscribe((data: any) => {
          this.imageUrl = data.fileDownloadUri;
        });
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}


