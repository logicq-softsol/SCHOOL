import { Component, OnInit, EventEmitter, Inject, ElementRef, ViewChild, SecurityContext } from '@angular/core';
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
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PdfDetail } from '../questions/pdf-detail';
import { PDFWorker } from 'pdfjs-dist';



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


  classdisplayName: any;
  subjectdisplayName: any;
  chapterdisplayName: any;
  displayView: any;

  questionPath: any = '';


  constructor(
    private contentMgmntService: ContentMgmntService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    this.displayView = 'CLASS';
    this.contentMgmntService.getDisplayView().subscribe((dview: any) => {
      this.displayView = dview;
    })

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;

    });

    this.contentMgmntService.getClassSetupDetail().subscribe((data: ClassSetupDetail) => {
      this.classSetup = data;
      this.classdisplayName = data.displayName;
    });


    this.contentMgmntService.getSubjectDetail().subscribe((data: SubjectSetupDetail) => {
      this.subjectSetup = data;
      this.subjectdisplayName = data.displayName;
      this.contentMgmntService.getSchoolType().subscribe(sType => {
          if ("ICSE" == sType) {
            this.subjectSetup.isEBookAvilable = false;
          } else {
            this.subjectSetup.isEBookAvilable = true;
          }
      });
    });



    this.contentMgmntService.getChapterSetupDetail().subscribe((data: ChapterSetupDetail) => {
      this.chapter = data;
      this.chapterdisplayName = data.displayName;
      this.contentMgmntService.getSchoolType().subscribe(sType => {
        if ("ICSE" == sType) {
          this.chapter.isEBookAvilable = false;
        } else {
          this.chapter.isEBookAvilable = true;
        }
    });
      this.contentMgmntService.getTopicListForChapterForSubjectAndClass(this.chapter.classId, this.chapter.subjectId, this.chapter.id).subscribe((tdata: TopicDetail[]) => {
        this.topicList = tdata;
      });

    });

    this.contentMgmntService.getClassList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });

    this.contentMgmntService.getSubjectList().subscribe((data: SubjectSetupDetail[]) => {
      this.classSubjectList = data;
      this.contentMgmntService.getSchoolType().subscribe(sType => {
        this.classSubjectList.forEach(subject => {
          if ("ICSE" == sType) {
            subject.isEBookAvilable = false;
          } else {
            subject.isEBookAvilable = true;
          }
        });
      });
    });
    this.contentMgmntService.getChapterList().subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
      this.contentMgmntService.getSchoolType().subscribe(sType => {
        this.chapterList.forEach(chapter => {
          if ("ICSE" == sType) {
            chapter.isEBookAvilable = false;
          } else {
            chapter.isEBookAvilable = true;
          }
        });
      });
    });

  }


  viewMyFavorites() {

  }


  goToHome() {
    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });
    this.displayView = 'CLASS';
    this.contentMgmntService.changeDisplayView(this.displayView);
  }


  onClassChange(classdisplayName) {
    this.classdisplayName = classdisplayName;
    if (this.classdisplayName.length > 1) {
      let classDetail: ClassSetupDetail = this.classList.find(x => x.displayName == classdisplayName);
      this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
        this.classSubjectList = data;
        this.contentMgmntService.changeClassSetupDetail(classDetail);
        this.contentMgmntService.changeSubjectList(data);
        this.displayView = 'SUBJECT';
        this.contentMgmntService.changeDisplayView(this.displayView);
      });
    }
  }


  onSubjectChange(subjectdisplayName) {
    this.subjectdisplayName = subjectdisplayName;
    if (this.subjectdisplayName.length > 1) {
      let subject: SubjectSetupDetail = this.classSubjectList.find(x => x.displayName == subjectdisplayName);
      this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((data: ChapterSetupDetail[]) => {
        this.chapterList = data;
        this.contentMgmntService.changeSubjectDetail(subject);
        this.contentMgmntService.changeChapterList(data);
        this.displayView = 'CHAPTER';
        this.contentMgmntService.changeDisplayView(this.displayView);
      });
    }
  }

  onChapterChange(chapterdisplayName) {
    this.chapterdisplayName = chapterdisplayName;
    if (this.chapterdisplayName.length > 1) {
      let chapter: ChapterSetupDetail = this.chapterList.find(x => x.displayName == chapterdisplayName);
      this.contentMgmntService.changeChapterSetupDetail(chapter);
      this.chapter = chapter;
      this.contentMgmntService.changeChapterSetupDetail(chapter);
      this.contentMgmntService.getTopicListForChapterForSubjectAndClass(this.chapter.classId, this.chapter.subjectId, this.chapter.id).subscribe((tdata: TopicDetail[]) => {
        this.topicList = tdata;
        this.displayView = 'TOPIC';
        this.contentMgmntService.changeDisplayView(this.displayView);
      });
    }



  }


  searchTopicDetails() {
    // this.contentMgmntService.getTopicListForChapterForSubjectAndClass(this.chapter.classId, this.chapter.subjectId, this.chapter.id).subscribe((tdata: TopicDetail[]) => {
    //   this.topicList = tdata;
    // });
    if (null != this.chapterdisplayName && this.chapterdisplayName.length > 1) {
      this.onChapterChange(this.chapterdisplayName);
    } else if (null != this.subjectdisplayName && this.subjectdisplayName.length > 1) {
      this.onSubjectChange(this.subjectdisplayName);
    } else if (null != this.classdisplayName && this.classdisplayName.length > 1) {
      this.onClassChange(this.classdisplayName);
    }
  }

  viewSubjectListForClass(value) {
    this.onClassChange(value);
    this.displayView = 'SUBJECT';
  }

  viewChapterListForSubject(value) {
    this.onSubjectChange(value);

  }

  viewTopicListForChapter(value) {
    this.onChapterChange(value);
    this.displayView = 'TOPIC';
  }
  viewQuestionsForChapter(chapter: ChapterSetupDetail) {
    this.buildQuestionPathForChapter(chapter);
    chapter.questionPath = this.questionPath;
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.contentMgmntService.changeQuestionView('CHAPTER');
    this.router.navigate(['/home/teacher/question']);
  }

  viewQuestionsForSubject(subject: SubjectSetupDetail) {
    this.buildQuestionPathForSubject(subject);
    subject.questionPath = this.questionPath;
    this.contentMgmntService.changeSubjectDetail(subject);
    this.contentMgmntService.changeQuestionView('SUBJECT');
    this.router.navigate(['/home/teacher/question']);

  }

  private buildQuestionPathForChapter(chpater: ChapterSetupDetail) {
    this.questionPath = '';
    this.questionPath = 'assets/question';
    var className = this.classSetup.displayName.replace(/\s/g, "");
    var subjectName = this.subjectSetup.displayName.replace(/\s/g, "");
    var chapterName = chpater.displayName.replace(/\s/g, "");
    this.questionPath = this.questionPath + "/" + className + "/" + subjectName + "/" + chapterName;
  }


  private buildQuestionPathForSubject(subject: SubjectSetupDetail) {
    this.questionPath = '';
    this.questionPath = 'assets/question';
    var className = this.classSetup.displayName.replace(/\s/g, "");
    var subjectName = subject.displayName.replace(/\s/g, "");
    this.questionPath = this.questionPath + "/" + className + "/" + subjectName;
  }

  viewQuestions(topic: TopicDetail) {
    this.buildQuestionPathForTopic(topic);
    topic.questionPath = this.questionPath;
    this.contentMgmntService.changeTopic(topic);
    this.contentMgmntService.changeQuestionView('TOPIC');
    this.router.navigate(['/home/teacher/question']);
  }



  private buildQuestionPathForTopic(topic: TopicDetail) {
    this.questionPath = '';
    this.questionPath = 'assets/question';
    var className = this.classSetup.displayName.replace(/\s/g, "");
    var subjectName = this.subjectSetup.displayName.replace(/\s/g, "");
    var chapterName = this.chapter.displayName.replace(/\s/g, "");
    var topicName = topic.displayName.replace(/\s/g, "");
    this.questionPath = this.questionPath + "/" + className + "/" +
      subjectName + "/" + chapterName + "/" + topicName;
  }



  viewEBookForChapter(chapter: ChapterSetupDetail) {
    this.buildEBookPathForChapter(chapter);
    this.contentMgmntService.getEbookDetails(chapter.displayName, this.questionPath).subscribe((ebookLink: PdfDetail) => {
      this.contentMgmntService.changePdfData(ebookLink);
      this.router.navigate(['/home/teacher/pdf']);
    });
  }


  viewEBookForSubject(subject: SubjectSetupDetail) {
    this.buildEBookPathForSubject(subject);
    this.contentMgmntService.getEbookDetails(subject.displayName, this.questionPath).subscribe((ebookLink: PdfDetail) => {
      this.contentMgmntService.changePdfData(ebookLink);
      this.router.navigate(['/home/teacher/pdf']);
    });

  }



  private buildEBookPathForChapter(chpater: ChapterSetupDetail) {
    this.questionPath = '';
    this.questionPath = 'assets/question';
    var className = this.classSetup.displayName.replace(/\s/g, "");
    var subjectName = this.subjectSetup.displayName.replace(/\s/g, "");
    var chapterName = chpater.displayName.replace(/\s/g, "");
    this.questionPath = this.questionPath + "/" + className + "/" + subjectName + "/" + chapterName;
  }


  private buildEBookPathForSubject(subject: SubjectSetupDetail) {
    this.questionPath = '';
    this.questionPath = 'assets/question';
    var className = this.classSetup.displayName.replace(/\s/g, "");
    var subjectName = subject.displayName.replace(/\s/g, "");
    this.questionPath = this.questionPath + "/" + className + "/" + subjectName;
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

  closePlayVideo() {
    this.displayView = 'TOPIC';
  }


  editSubjectDetail(subject: SubjectSetupDetail) {
    const dialogRef = this.dialog.open(SubjectDetailDialog, {
      width: '600px',
      data: {
        type: "EDIT",
        classList: this.classList,
        subject: subject
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open("Subject Edited Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(subjectDetail.classId).subscribe((data: SubjectSetupDetail[]) => {
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
        classList: this.classList,
        subject: subject
      }
    });

    dialogRef.componentInstance.subjectEventEmmiter.subscribe((subjectDetail: SubjectSetupDetail) => {
      this.contentMgmntService.setupSubjectDetails(subjectDetail).subscribe((subjectDetail: SubjectSetupDetail) => {
        this.snackBar.open("Subject Deleted Sucessfully. ", "CLOSE");
        this.contentMgmntService.getSubjectListForClass(subjectDetail.classId).subscribe((data: SubjectSetupDetail[]) => {
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
        classList: this.classList,
        chapter: null
      }
    });

    dialogRef.componentInstance.chapterEventEmmiter.subscribe((chapterDetail: ChapterSetupDetail) => {
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
        classList: this.classList,
        chapter: chapterDetail
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
        classList: this.classList,
        chapter: chapterDetail
      }
    });

    dialogRef.componentInstance.chapterEventEmmiter.subscribe((chapterDetail: ChapterSetupDetail) => {

      this.contentMgmntService.deleteChapterDetails(chapterDetail).subscribe((chapterDetail: ChapterSetupDetail) => {
        this.snackBar.open("Chapter Deleted Sucessfully. ", "CLOSE");
        this.contentMgmntService.getChapterListForSubjectAndClass(chapterDetail.classId, chapterDetail.subjectId).subscribe((data: ChapterSetupDetail[]) => {
          this.chapterList = data;
        });
      });
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
      classDetails.type = "CLASS"
      this.contentMgmntService.setupClassDetails(classDetails).subscribe((classDetails: ClassSetupDetail) => {
        this.snackBar.open(" Class Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
          this.classList = data;
        });
      });
    });
  }



  addTopicDetails() {
    const dialogRef = this.dialog.open(TopicDetailDialog, {
      width: '600px',
      data: {
        type: "ADD",
        classList: this.classList,
        topic: null
      }
    });

    dialogRef.componentInstance.topicEventEmmiter.subscribe((topicDetail: TopicDetail) => {
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
        classList: this.classList,
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
        classList: this.classList,
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


@Component({
  selector: 'subject-dialog',
  templateUrl: 'subject-dialog.html',
  styleUrls: ['./topic.scss']
})
export class SubjectDetailDialog {
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();
  subjectEventEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  classList: ClassSetupDetail[] = [];
  className: string;

  constructor(public dialogRef: MatDialogRef<SubjectDetailDialog>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.operationType = data.type;
    this.classList = data.classList;
    if ("ADD" == data.type) {
      this.subjectSetup = new SubjectSetupDetail();
    } else {
      this.subjectSetup = data.subject;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClassChange(value) {
    this.className = value;
  }

  saveSubjectChange() {
    if ("ADD" == this.operationType) {
      let classSetup: ClassSetupDetail = this.classList.find(x => x.displayName == this.className);
      this.subjectSetup.classId = classSetup.id;
      this.subjectSetup.type = "SUBJECT";
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
  styleUrls: ['./topic.scss']
})
export class ChapterDetailDialog {
  chapterSetup: ChapterSetupDetail = new ChapterSetupDetail();
  chapterEventEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  classList: ClassSetupDetail[] = [];
  subjectList: SubjectSetupDetail[] = [];
  className: string;
  subjectName: string;

  constructor(public dialogRef: MatDialogRef<ChapterDetailDialog>, @Inject(MAT_DIALOG_DATA) private data: any, private contentMgmntService: ContentMgmntService) {
    this.operationType = data.type;
    this.classList = data.classList;

    if ("ADD" == data.type) {
      this.chapterSetup = new ChapterSetupDetail();
    } else {
      this.chapterSetup = data.chapter;
      let classDetail: ClassSetupDetail = this.classList.find(x => x.id == this.chapterSetup.classId);
      this.className = classDetail.displayName;
      this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
        this.subjectList = data;
        let subject: SubjectSetupDetail = this.subjectList.find(x => x.id == this.chapterSetup.subjectId);
        this.subjectName = subject.displayName;
      });
    }
  }


  onClassChange(value) {
    this.className = value;
    let classDetail: ClassSetupDetail = this.classList.find(x => x.displayName == value);
    this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
      this.subjectList = [];
      this.subjectName = '';
      this.subjectList = data;
    });
  }


  onSubjectChange(value) {
    this.subjectName = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChapter() {
    let subject: SubjectSetupDetail = this.subjectList.find(x => x.displayName == this.subjectName);
    this.chapterSetup.classId = subject.classId;
    this.chapterSetup.subjectId = subject.id;
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
  styleUrls: ['./topic.scss']
})
export class TopicDetailDialog {
  topicDetail: TopicDetail = new TopicDetail();
  topicEventEmmiter = new EventEmitter();
  operationType: string = "SAVE";
  classList: ClassSetupDetail[] = [];
  subjectList: SubjectSetupDetail[] = [];
  chapterList: ChapterSetupDetail[] = [];
  className: string;
  subjectName: string;
  chapterName: string;

  constructor(public dialogRef: MatDialogRef<TopicDetailDialog>, @Inject(MAT_DIALOG_DATA) private data: any, private contentMgmntService: ContentMgmntService) {
    this.operationType = data.type;
    this.classList = data.classList;
    if ("ADD" == data.type) {
      this.topicDetail = new TopicDetail();
    } else {
      this.topicDetail = data.topic;
      let classDetail: ClassSetupDetail = this.classList.find(x => x.id == this.topicDetail.classId);
      this.className = classDetail.displayName;
      this.onClassChange(this.className);
    }
  }



  onClassChange(value) {
    this.className = value;
    let classDetail: ClassSetupDetail = this.classList.find(x => x.displayName == this.className);
    this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((data: SubjectSetupDetail[]) => {
      this.subjectList = data;
      let subject: SubjectSetupDetail = this.subjectList.find(x => x.id == this.topicDetail.subjectId);
      this.subjectName = subject.displayName;
      this.onSubjectChange(this.subjectName);
    });
  }


  onSubjectChange(value) {
    this.subjectName = value;
    let subject: SubjectSetupDetail = this.subjectList.find(x => x.displayName == this.subjectName);
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
      let chapter: ChapterSetupDetail = this.chapterList.find(x => x.id == this.topicDetail.chapterId);
      this.chapterName = chapter.displayName;
      this.onChapterChange(this.chapterName);
    });
  }

  onChapterChange(value) {
    this.chapterName = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveTopicDetails() {
    let chapter: ChapterSetupDetail = this.chapterList.find(x => x.displayName == this.chapterName);
    this.topicDetail.classId = chapter.classId;
    this.topicDetail.subjectId = chapter.subjectId;
    this.topicDetail.chapterId = chapter.id;
    if ("ADD" == this.operationType) {
      if (this.topicDetail.name == null) {
        this.topicDetail.name = this.topicDetail.displayName.replace(/\s/g, "");
      }
    }
    this.topicEventEmmiter.emit(this.topicDetail);
    this.onNoClick();
  }

}





@Component({
  selector: 'class-dialog',
  templateUrl: 'class-dialog.html',
  styleUrls: ['./topic.scss']
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
  selector: 'video-play-dialog',
  templateUrl: 'video-dialog.html',
  styleUrls: ['./topic.scss']
})
export class VideoDialog {
  videoURL: any;
  topic: TopicDetail = new TopicDetail();
  constructor(public dialogRef: MatDialogRef<VideoDialog>, @Inject(MAT_DIALOG_DATA) private data: any, private _sanitizer: DomSanitizer, public snackBar: MatSnackBar, private contentMgmntService: ContentMgmntService) {
    this.videoURL = this._sanitizer.bypassSecurityTrustUrl(data.url);
    this.topic = data.topic;
    this.contentMgmntService.startSession(this.topic).subscribe((message: any) => {
      this.openErrorSnackBar("Session Started..", "CLOSE");
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.contentMgmntService.endSession(this.topic).subscribe((message: any) => {
      this.openErrorSnackBar("Session Closed..", "CLOSE");
    });
  }

  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }


}



