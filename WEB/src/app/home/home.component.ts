import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserDetail } from '../public/model/user-detail';
import { ClassSetupDetail } from '../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../public/model/chapter-setup-detail';
import { ContentMgmntService } from '../home/service/content-mgmnt.service';
import { TopicDetail } from '../public/model/topic-detail';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserDetail = new UserDetail();
  breadcurmblist: any;
  today: Date = new Date();

  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private router: Router, public snackBar: MatSnackBar) {
    if (this.authService.isAuthenticate) {
      this.authService.getUserDetail().subscribe((user: UserDetail) => {
        this.user = user;
        this.router.navigate(['/home/teacher']);
      });
    }
  }

  ngOnInit() {

  }


  logout() {
    this.router.navigate(['login']);
  }

  setupDayZero() {
    this.contentMgmntService.setupDayZeroForSchool().subscribe(data => {
      this.openSnackBar("All Class,Subject,Chapter,Topic Setup sucessfully", "SUCESS");
    });
  }

  gotToHomepage() {
      this.router.navigate(['/home/teacher']);
  }
  viewSessionReport() {
      this.router.navigate(['/home/teacher']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

}
