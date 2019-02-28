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


@Component({
  selector: 'app-content-chapter',
  templateUrl: './content-chapter.component.html',
  styleUrls: ['./content-chapter.component.scss']
})
export class ContentChapterComponent implements OnInit {

  classDetail: ClassSetupDetail = new ClassSetupDetail();
  classList: ClassSetupDetail[] = [];

  subjectList: SubjectSetupDetail[] = [];
  subjectDetail: SubjectSetupDetail = new SubjectSetupDetail();

  chapter: ChapterSetupDetail = new ChapterSetupDetail();
  chapterList: ChapterSetupDetail[] = [];

  user: UserDetail = new UserDetail();
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

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });
    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });

    this.contentMgmntService.getClassSetupDetail().subscribe((classDetail: ClassSetupDetail) => {
      this.classDetail = classDetail;
      this.showClassSubjectList(classDetail);
    });
    this.contentMgmntService.getSubjectDetail().subscribe((subject: SubjectSetupDetail) => {
      this.subjectDetail = subject;
      this.contentMgmntService.getChapterListForSubjectAndClass(this.subjectDetail.classId, this.subjectDetail.id).subscribe((chapters: ChapterSetupDetail[]) => {
        this.chapterList = chapters;
      });
    });


  }


  viewTopicist(chapter:ChapterSetupDetail){
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.router.navigate(['/home/contentmgmnt/subject/chapter/topic']);
  }


  userYourWorkSpace(chapter:ChapterSetupDetail){
    const dialogRef = this.dialog.open(WorkSpaceDialog, {
      width: '600px',
      data: {
        type: "ADD",
        chapterDetail: chapter
      }
    });

    dialogRef.componentInstance.workSpaceEmmiter.subscribe((workSpaceContent:any)=>{

    });
  }

  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.subjectList = subjectList;
    });
  }

  viewChapterList(subject: SubjectSetupDetail) {
    this.contentMgmntService.changeSubjectDetail(subject);
    this.router.navigate(['/home/contentmgmnt/subject/chapter']);
  }

  viewSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.changeClassSetupDetail(classSetup);
    this.router.navigate(['/home/contentmgmnt/subject']);
  }

  addChapterDetails() {
    const dialogRef = this.dialog.open(ChapterDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        chapterDetail: null
      }
    });

    dialogRef.componentInstance.chapterEventEmmiter.subscribe((chapterDetail: ChapterSetupDetail) => {
      //   subjectDetail.icon = this.imageUrl;
      chapterDetail.type = "CHAPTER";
      chapterDetail.classId = this.subjectDetail.classId;
      chapterDetail.subjectId = this.subjectDetail.id;
      this.contentMgmntService.setupChapterDetails(chapterDetail).subscribe((chapterDetail: ChapterSetupDetail) => {
        this.snackBar.open(" Subjject Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getChapterListForSubjectAndClass(chapterDetail.classId, chapterDetail.subjectId).subscribe((data: ChapterSetupDetail[]) => {
          this.chapterList = data;
        });
      });
    });
  }

  editChapterDetail(chapterDetail: ChapterSetupDetail) {
    const dialogRef = this.dialog.open(ChapterDetailDialog, {
      width: '600px',
      data: {
        type: "EDIT",
        chapterDetail: chapterDetail
      }
    });

    dialogRef.componentInstance.chapterEventEmmiter.subscribe((chapterDetail: ChapterSetupDetail) => {
      this.contentMgmntService.editChapterDetails(chapterDetail).subscribe((chapterDetail: ChapterSetupDetail) => {
        this.snackBar.open("Chapter Edited Sucessfully. ", "CLOSE");
        this.contentMgmntService.getChapterListForSubjectAndClass(chapterDetail.classId, chapterDetail.subjectId).subscribe((data: ChapterSetupDetail[]) => {
          this.chapterList = data;
        });
      });
    });

  }

  deleteChapterDetail(chapterDetail: ChapterSetupDetail) {
    const dialogRef = this.dialog.open(ChapterDetailDialog, {
      width: '600px',
      data: {
        type: "DELETE",
        chapterDetail: chapterDetail
      }
    });

    dialogRef.componentInstance.chapterEventEmmiter.subscribe((chapterDetail: ChapterSetupDetail) => {

      this.contentMgmntService.deleteChapterDetails(chapterDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open("Chapter Deleted Sucessfully. ", "CLOSE");
        this.contentMgmntService.getChapterListForSubjectAndClass(chapterDetail.classId, chapterDetail.subjectId).subscribe((data: ChapterSetupDetail[]) => {
          this.chapterList = data;
        });
      });
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




@Component({
  selector: 'chapter-setup-dialog',
  templateUrl: 'chapter-setup-dialog.html',
  styleUrls: ['./content-chapter.component.scss']
})
export class ChapterDetailDialog {
  chapterSetup: ChapterSetupDetail = new ChapterSetupDetail();
  chapterEventEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  constructor(public dialogRef: MatDialogRef<ChapterDetailDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.operationType = data.type;
    if ("ADD" == data.type) {
      this.chapterSetup = new ChapterSetupDetail();
    } else {
      this.chapterSetup = data.chapterDetail;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChapterChange() {
    if ("ADD" == this.operationType) {
      if (this.chapterSetup.name == null) {
        this.chapterSetup.name = this.chapterSetup.displayName.replace(/\s/g, "");
      }
    }
    this.chapterEventEmmiter.emit(this.chapterSetup);
    this.onNoClick();
  }

}
