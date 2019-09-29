import { Component, OnInit, Inject } from '@angular/core';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TopicDetail } from 'src/app/public/model/topic-detail';
import { QuestionDetails } from './question-detail';
import { MatRadioChange } from '@angular/material';
import { PdfDetail } from './pdf-detail';


@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrls: ['./question.scss']
})
export class QuestionComponent implements OnInit {
  public questionList: QuestionDetails[] = [];
  public pdfList: PdfDetail[] = [];
  public startIndex: number = 0;
  public endIndex: number = 5;
  public selectedOpt: any;
  attempted: boolean;
  constructor(private contentMgmntService: ContentMgmntService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router) { }


  ngOnInit() {

    this.contentMgmntService.getTopic().subscribe((topic: TopicDetail) => {
      if (null != topic) {
        this.contentMgmntService.getQuestionList(topic).subscribe((qusts: QuestionDetails[]) => {
          this.questionList = qusts;
        });
        this.contentMgmntService.getPdfList(topic).subscribe((pdfs: PdfDetail[]) => {
          this.pdfList = pdfs;
        });
      }
    });

  }

  onChangeQusetionOption(event: any, question: QuestionDetails) {
    if (event.value === question.coption) {
      question.ansflag = 'C';
    } else {
      question.ansflag = 'W';
    }

  }
  resetQuestionAnswer(question: QuestionDetails){
    question.ansflag = 'N';
  }

  viewCorrectAnswer(question: QuestionDetails) {
    const dialogRef = this.dialog.open(CorrectAnswerDialog, {
      width: '350px',
      data: question
    });
  }

  viewPrevious() {
    if (this.startIndex > 0) {
      this.startIndex = this.startIndex - 5;
      this.endIndex = this.endIndex - 5;
    } else {
      this.openErrorSnackBar("No more further question exist", "CLOSE");
    }

  }

  viewNext() {
    if (this.endIndex < this.questionList.length + 1) {
      this.startIndex = this.startIndex + 5;
      this.endIndex = this.endIndex + 5;
    } else {
      this.openErrorSnackBar("No more further question exist", "CLOSE");
    }

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
  }
}


@Component({
  selector: 'correct-ans-dialog',
  templateUrl: 'correct-ans-dialog.html',
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





