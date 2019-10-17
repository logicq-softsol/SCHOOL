import { Component, OnInit, Inject } from '@angular/core';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TopicDetail } from 'src/app/public/model/topic-detail';
import { QuestionDetails } from './question-detail';
import { MatRadioChange } from '@angular/material';
import { PdfDetail } from './pdf-detail';
import { UserDetail } from 'src/app/public/model/user-detail';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { defaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrls: ['./question.scss']
})
export class QuestionComponent implements OnInit {

  user: UserDetail = new UserDetail();
  classList: ClassSetupDetail[] = [];
  classSetup: ClassSetupDetail = new ClassSetupDetail();

  classSubjectList: SubjectSetupDetail[] = [];
  subjectSetup: SubjectSetupDetail = new SubjectSetupDetail();

  chapterList: ChapterSetupDetail[] = [];
  chapter: ChapterSetupDetail = new ChapterSetupDetail();

  topicList: TopicDetail[] = [];
  topic: TopicDetail = new TopicDetail();

  classdisplayName: any;
  subjectdisplayName: any;
  chapterdisplayName: any;
  displayView: any;

  questionPath: any = 'assets/question';

  public questionList: QuestionDetails[] = [];
  public pdfList: PdfDetail[] = [];
  public selectedOpt: any;
  public optionFlag: any = 'none';

  public correctAudio = new Audio();
  public wrongAudio = new Audio();
  public pdfsrc: string = "";

  constructor(private contentMgmntService: ContentMgmntService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router, private authService: AuthenticationService) {

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
    });



    this.contentMgmntService.getChapterSetupDetail().subscribe((data: ChapterSetupDetail) => {
      if (null != data) {
        this.chapter = data;
        this.chapterdisplayName = data.displayName;
        this.contentMgmntService.getTopicListForChapterForSubjectAndClass(this.chapter.classId, this.chapter.subjectId, this.chapter.id).subscribe((tdata: TopicDetail[]) => {
          this.topicList = tdata;
        });

      }

    });

    this.contentMgmntService.getClassList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });

    this.contentMgmntService.getSubjectList().subscribe((data: SubjectSetupDetail[]) => {
      this.classSubjectList = data;
    });
    this.contentMgmntService.getChapterList().subscribe((data: ChapterSetupDetail[]) => {
      this.chapterList = data;
    });

    this.contentMgmntService.getQuestionView().subscribe((view: string) => {
      if ('TOPIC' == view) {
        this.contentMgmntService.getTopic().subscribe((topic: TopicDetail) => {
          if (null != topic) {
            this.contentMgmntService.getQuestionList(topic).subscribe((qusts: QuestionDetails[]) => {
              this.questionList = qusts;
            });
            this.contentMgmntService.getPdfList(topic).subscribe((pdfs: PdfDetail[]) => {
              this.pdfList = pdfs;
              if (null != this.pdfList && this.pdfList.length > 0) {
                this.pdfsrc = this.pdfList[0].link;
              }
            });
          }
        });
      }
      if ('SUBJECT' == view) {
        this.contentMgmntService.getSubjectDetail().subscribe((subject: SubjectSetupDetail) => {
          if (null != subject) {
            this.contentMgmntService.getQuestionForSubject(subject).subscribe((qusts: QuestionDetails[]) => {
              this.questionList = qusts;
            });
            this.contentMgmntService.getPdfListForSubject(subject).subscribe((pdfs: PdfDetail[]) => {
              this.pdfList = pdfs;
              if (null != this.pdfList && this.pdfList.length > 0) {
                this.pdfsrc = this.pdfList[0].link;
              }
            });
          }
        });

      }
      if ('CHAPTER' == view) {
        this.contentMgmntService.getChapterSetupDetail().subscribe((chapter: ChapterSetupDetail) => {
          if (null != chapter) {
            this.contentMgmntService.getQuestionForChapter(chapter).subscribe((qusts: QuestionDetails[]) => {
              this.questionList = qusts;
            });
            this.contentMgmntService.getPdfListForChapter(chapter).subscribe((pdfs: PdfDetail[]) => {
              this.pdfList = pdfs;
              if (null != this.pdfList && this.pdfList.length > 0) {
                this.pdfsrc = this.pdfList[0].link;
              }
            });
          }
        });

      }

    });


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
  classClear() {
    this.classdisplayName = null;
  }
  subjectClear() {
    this.subjectdisplayName = null;
  }
  chapterClear() {
    this.chapterdisplayName = null;
  }

  searchTopicDetails() {
    this.router.navigate(['/home/teacher/topics']);
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


  viewQuestions(topic: TopicDetail) {
    this.buildQuestionPathForTopic(topic);
    topic.questionPath = this.questionPath;
    this.contentMgmntService.changeTopic(topic);
    this.router.navigate(['/home/teacher/question']);
  }



  private buildQuestionPathForTopic(topic: TopicDetail) {

    var className = this.classSetup.displayName.replace(/\s/g, "");
    var subjectName = this.subjectSetup.displayName.replace(/\s/g, "");
    var chapterName = this.chapter.displayName.replace(/\s/g, "");
    var topicName = topic.displayName.replace(/\s/g, "");
    this.questionPath = this.questionPath + "/" + className + "/" +
      subjectName + "/" + chapterName + "/" + topicName;
  }


  onChangeQusetionOption(event: any, question: QuestionDetails) {
    if (event.value === question.coption) {
      question.ansflag = 'C';
      this.optionFlag = 'correct';
      this.correctAudio.src = "assets/mp3/correct.mp3";
      this.correctAudio.load();
      this.correctAudio.play();
    } else {
      question.ansflag = 'W';
      this.optionFlag = 'wrong';
      this.wrongAudio.src = "assets/mp3/wrong.mp3";
      this.wrongAudio.load();
      this.wrongAudio.play();
    }

  }
  resetQuestionAnswer(question: QuestionDetails) {
    question.ansflag = 'N';
    this.optionFlag = 'none';
    this.selectedOpt = "";
  }

  viewCorrectAnswer(question: QuestionDetails) {
    const dialogRef = this.dialog.open(CorrectAnswerDialog, {
      width: '350px',
      data: question
    });
  }



  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

  downloadPDf(pdf: PdfDetail) {
    let link = document.createElement("a");
    link.download = pdf.name;
    link.href = pdf.link;
    link.click();
    // const fhttp://127.0.0.1:4200/ileURL = URL.createObjectURL(pdf.link);
    // pdf.link="http://127.0.0.1:4200/assets/question/nursery/pdf/Nursery-2012.pdf";
    //  window.open(pdf.link);
    this.pdfsrc = pdf.link;
  }
}


@Component({
  selector: 'correct-ans-dialog',
  templateUrl: 'correct-ans-dialog.html',
  styleUrls: ['./question.scss']
})
export class CorrectAnswerDialog {
  public question: QuestionDetails;
  constructor(
    public dialogRef: MatDialogRef<CorrectAnswerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionDetails) {
    this.question = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}





