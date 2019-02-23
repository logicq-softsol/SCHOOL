import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContentMgmntService } from 'src/app/home/service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetail } from 'src/app/public/model/user-detail';
import { Router } from '@angular/router';


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

  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private dialog: MatDialog, private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });

    this.contentMgmntService.getClassSetupDetail().subscribe((classDetail: ClassSetupDetail) => {
      this.classDetail = classDetail;
    });
    this.contentMgmntService.getSubjectDetail().subscribe((subject: SubjectSetupDetail) => {
      this.subjectDetail = this.subjectDetail;
      this.contentMgmntService.getChapterListForSubjectAndClass(this.subjectDetail.classId, this.subjectDetail.id).subscribe((chapters: ChapterSetupDetail[]) => {
        this.chapterList = chapters;
      });
    });


  }


  showClassSubjectList(classSetup: ClassSetupDetail){
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.subjectList = subjectList;
    });
  }


  showChapterList(classDet: ClassSetupDetail, subjectDe: SubjectSetupDetail) {
    this.contentMgmntService.changeClassSetupDetail(classDet);
    this.contentMgmntService.changeSubjectDetail(subjectDe);
    this.router.navigate(['/home/contentmgmnt/subject/chapter']);
  }

  addChapterDetails() {
    const dialogRef = this.dialog.open(ChapterDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        subjectDetail: null
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
        subjectDetail: chapterDetail
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
