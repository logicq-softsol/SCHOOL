import { Component, OnInit } from '@angular/core';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question',
  templateUrl: './question.html',
  styleUrls: ['./question.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private contentMgmntService: ContentMgmntService,
    public dialog: MatDialog,
    public dialogProfileImage: MatDialog,
    public snackBar: MatSnackBar, private router: Router) { }


  ngOnInit() {

  }
}






