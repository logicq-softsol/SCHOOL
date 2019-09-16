import { Component, OnInit } from '@angular/core';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TopicDetail } from 'src/app/public/model/topic-detail';
import { QuestionDetails } from './question-detail';


@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrls: ['./question.scss']
})
export class QuestionComponent implements OnInit {
  public questionList: QuestionDetails[] = [];

  constructor(private contentMgmntService: ContentMgmntService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router) { }


  ngOnInit() {

    this.contentMgmntService.getTopic().subscribe((topic: TopicDetail) => {
      this.contentMgmntService.getQuestionList(topic.name, "" + topic.id).subscribe((qusts: QuestionDetails[]) => {
        this.questionList = qusts;
      });
    });

  }
}






