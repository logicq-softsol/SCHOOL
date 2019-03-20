import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetail } from '../../public/model/user-detail';
import { HomeService } from '../service/home.service';
import { ClassSetupDetail } from '../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../public/model/subject-setup-detail';
import { ContentMgmntService } from '../service/content-mgmnt.service';
import { TopicDetail } from '../../public/model/topic-detail';
import { ChapterSetupDetail } from '../../public/model/chapter-setup-detail';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {

  loginUser: UserDetail;

  selectImage: File;
  imageUrl: string;

  regUserList: UserDetail[] = [];

  classList: ClassSetupDetail[] = [];
  classSetup: ClassSetupDetail = new ClassSetupDetail();

  classSubjectList: SubjectSetupDetail[] = [];
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();

  chapterList: ChapterSetupDetail[] = [];
  chapter: ChapterSetupDetail = new ChapterSetupDetail();

  topicList: TopicDetail[] = [];
  topic: TopicDetail = new TopicDetail();


  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private homeService: HomeService, public dialogProfileImage: MatDialog, public snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.authService.isAuthenticate) {
      this.authService.getUserDetail().subscribe((user: UserDetail) => {
        this.loginUser = user;
      });
      this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
        this.classList = data;
        this.onClassChange(this.classList[0].displayName);
      });
    }
  }

  onClassChange(event) {
    let classDetails: ClassSetupDetail = this.classList.find(cls => cls.displayName == event);
    this.showClassSubjectList(classDetails);
  }

  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
      this.viewChapterList(this.classSubjectList[0]);
    });
  }

  viewChapterList(subject: SubjectSetupDetail) {
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
      this.chapterList = chapters;
      this.showTopicList(this.chapterList[0]);
    });
  }

  showTopicList(chapter: ChapterSetupDetail) {
    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.id).subscribe((topics: TopicDetail[]) => {
      this.topicList = topics;
    });
  }

  playTopic(topic: TopicDetail) {
    this.contentMgmntService.playLesson().subscribe((data) => {
      let file = new Blob([data], { type: 'video/mp4' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  editClassDetails(classSetup: ClassSetupDetail) {
    const dialogRef = this.dialog.open(ClassSetupDialog, {
      width: '600px',
      data: {
        type: "EDIT",
        classDetail: classSetup
      }
    });

    dialogRef.componentInstance.classesEmmiter.subscribe((classDetails: ClassSetupDetail) => {
      this.contentMgmntService.editClassDetails(classDetails).subscribe((classDetails: ClassSetupDetail) => {
        this.snackBar.open(" Class Edited Sucessfully. ", "CLOSE");
        this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
          this.classList = data;
        });
      });
    });
  }

  deleteClassDetails(classSetup: ClassSetupDetail) {
    const dialogRef = this.dialog.open(ClassSetupDialog, {
      width: '600px',
      data: {
        type: "DELETE",
        classDetail: classSetup
      }
    });

    dialogRef.componentInstance.classesEmmiter.subscribe((classDetails: ClassSetupDetail) => {
      this.contentMgmntService.deleteClassDetails(classDetails).subscribe((classDetails: ClassSetupDetail) => {
        this.snackBar.open(" Class Delete Sucessfully. ", "CLOSE");
        this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
          this.classList = data;
        });
      });
    });
  }


  addClassDetails() {
    const dialogRef = this.dialog.open(ClassSetupDialog, {
      width: '600px',
      data: {
        type: "ADD",
        classDetail: null
      }
    });

    dialogRef.componentInstance.classesEmmiter.subscribe((classDetails: ClassSetupDetail) => {
      classDetails.icon = this.imageUrl;
      classDetails.type = "CLASS"
      this.contentMgmntService.setupClassDetails(classDetails).subscribe((classDetails: ClassSetupDetail) => {
        this.snackBar.open(" Class Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
          this.classList = data;
        });
      });
    });
  }



  addSubjectDetails() {
    const dialogRef = this.dialog.open(SubjectDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        subjectDetail: null
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      //   subjectDetail.icon = this.imageUrl;
      subjectDetail.type = "SUBJECT";
      subjectDetail.classId = this.classSetup.id;
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open(" Subjject Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(this.classSetup.id).subscribe((data: SubjectSetupDetail[]) => {
          this.classSubjectList = data;
        });
      });
    });
  }

  editSubjectDetail(subject: SubjectSetupDetail) {
    const dialogRef = this.dialog.open(SubjectDetailDialog, {
      width: '600px',
      data: {
        type: "EDIT",
        subjectDetail: subject
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      //   subjectDetail.icon = this.imageUrl;
      subjectDetail.type = "SUBJECT";
      subjectDetail.classId = this.classSetup.id;
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open(" Subjject Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(this.classSetup.id).subscribe((data: SubjectSetupDetail[]) => {
          this.classSubjectList = data;
        });
      });
    });

  }

  deleteSubjectDetail(subject: SubjectSetupDetail) {
    const dialogRef = this.dialog.open(SubjectDetailDialog, {
      width: '600px',
      data: {
        type: "DELETE",
        subjectDetail: subject
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      //   subjectDetail.icon = this.imageUrl;
      subjectDetail.type = "SUBJECT";
      subjectDetail.classId = this.classSetup.id;
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open(" Subjject Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(this.classSetup.id).subscribe((data: SubjectSetupDetail[]) => {
          this.classSubjectList = data;
        });
      });
    });
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
      chapterDetail.classId = this.subjectSetup.classId;
      chapterDetail.subjectId = this.subjectSetup.id;
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



  addTopicDetails() {
    const dialogRef = this.dialog.open(TopicDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        chapterDetail: null
      }
    });

    dialogRef.componentInstance.topicEventEmmiter.subscribe((topicDetail: TopicDetail) => {
      topicDetail.icon = this.imageUrl;
      topicDetail.type = "TOPIC";
      topicDetail.classId = this.chapter.classId;
      topicDetail.subjectId = this.chapter.subjectId;
      topicDetail.chapterId = this.chapter.id;
      this.contentMgmntService.setupTopicDetails(topicDetail).subscribe((topicDetail: TopicDetail) => {
        this.snackBar.open(" Topic Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getTopicListForChapterForSubjectAndClass(topicDetail.classId, topicDetail.subjectId, topicDetail.chapterId).subscribe((topics: TopicDetail[]) => {
          this.topicList = topics;
        });

      });
    });
  }

  editTopicDetail(topicDetail: TopicDetail) {
    const dialogRef = this.dialog.open(TopicDetailDialog, {
      width: '600px',
      data: {
        type: "EDIT",
        topic: topicDetail
      }
    });

    dialogRef.componentInstance.topicEventEmmiter.subscribe((topicDetail: TopicDetail) => {
      this.contentMgmntService.editTopicDetails(topicDetail).subscribe((topicDetail: TopicDetail) => {
        this.snackBar.open(" Topic Edited Sucessfully. ", "CLOSE");
        this.contentMgmntService.getTopicListForChapterForSubjectAndClass(topicDetail.classId, topicDetail.subjectId, topicDetail.chapterId).subscribe((topics: TopicDetail[]) => {
          this.topicList = topics;
        });
      });
    });

  }

  deleteTopicDetail(topicDetail: TopicDetail) {
    const dialogRef = this.dialog.open(TopicDetailDialog, {
      width: '600px',
      data: {
        type: "DELETE",
        topic: topicDetail
      }
    });

    dialogRef.componentInstance.topicEventEmmiter.subscribe((topicDetail: TopicDetail) => {
      this.contentMgmntService.deleteTopicDetails(topicDetail).subscribe((topicDetail: TopicDetail) => {
        this.snackBar.open(" Topic Deleted Sucessfully. ", "CLOSE");
        this.contentMgmntService.getTopicListForChapterForSubjectAndClass(topicDetail.classId, topicDetail.subjectId, topicDetail.chapterId).subscribe((topics: TopicDetail[]) => {
          this.topicList = topics;
        });
      });
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}




@Component({
  selector: 'class-dialog',
  templateUrl: 'class-dialog.html',
  styleUrls: ['./admin.scss']
})
export class ClassSetupDialog {
  classSetup: ClassSetupDetail = new ClassSetupDetail();
  classesEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  constructor(public dialogRef: MatDialogRef<ClassSetupDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.operationType = data.type;
    if ("ADD" == data.type) {
      this.classSetup = new ClassSetupDetail();
    } else {
      this.classSetup = data.classDetail;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveClassChange() {
    if ("ADD" == this.operationType) {
      if (this.classSetup.name == null) {
        this.classSetup.name = this.classSetup.displayName.replace(/\s/g, "");
      }
    }
    this.classesEmmiter.emit(this.classSetup);
    this.onNoClick();
  }

}



@Component({
  selector: 'subject-dialog',
  templateUrl: 'subject-dialog.html',
  styleUrls: ['./admin.scss']
})
export class SubjectDetailDialog {
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();
  subjectEventEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  constructor(public dialogRef: MatDialogRef<SubjectDetailDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.operationType = data.type;
    if ("ADD" == data.type) {
      this.subjectSetup = new SubjectSetupDetail();
    } else {
      this.subjectSetup = data.subjectDetail;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveClassChange() {
    if ("ADD" == this.operationType) {
      if (this.subjectSetup.name == null) {
        this.subjectSetup.name = this.subjectSetup.displayName.replace(/\s/g, "");
      }
    }
    this.subjectEventEmmiter.emit(this.subjectSetup);
    this.onNoClick();
  }
}



@Component({
  selector: 'chapter-dialog',
  templateUrl: 'chapter-dialog.html',
  styleUrls: ['./admin.scss']
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






@Component({
  selector: 'topic-dialog',
  templateUrl: 'topic-dialog.html',
  styleUrls: ['./admin.scss']
})
export class TopicDetailDialog {
  topicDetail: TopicDetail = new TopicDetail();
  topicEventEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  constructor(public dialogRef: MatDialogRef<TopicDetailDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.operationType = data.type;
    if ("ADD" == data.type) {
      this.topicDetail = new TopicDetail();
    } else {
      this.topicDetail = data.tpoic;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveTopicDetails() {
    if ("ADD" == this.operationType) {
      if (this.topicDetail.name == null) {
        this.topicDetail.name = this.topicDetail.displayName.replace(/\s/g, "");
      }
    }
    this.topicEventEmmiter.emit(this.topicDetail);
    this.onNoClick();
  }

}
