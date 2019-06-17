import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserDetail } from '../public/model/user-detail';
import { ContentMgmntService } from '../home/service/content-mgmnt.service';
import { MatSnackBar } from '@angular/material';
import { TopicDetail } from 'src/app/public/model/topic-detail';
import { ClassSetupDetail } from 'src/app/public/model/class-setup-detail';
import { SubjectSetupDetail } from 'src/app/public/model/subject-setup-detail';
import { ChapterSetupDetail } from 'src/app/public/model/chapter-setup-detail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserDetail = new UserDetail();
  today: Date = new Date();

  topicList: TopicDetail[] = [];
  topic: TopicDetail = new TopicDetail();
  topicDisplayName: any;


  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private router: Router, public snackBar: MatSnackBar) {
    if (this.authService.isAuthenticate) {
      this.authService.getUserDetail().subscribe((user: UserDetail) => {
        this.user = user;
        this.router.navigate(['/home/teacher']);

      });
    }
  }

  ngOnInit() {
    this.contentMgmntService.getAllTopics().subscribe((topics: TopicDetail[]) => {
      this.topicList = topics;
    })
  }

  navigateHome() {
    this.router.navigate(['/home/teacher']);
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


  searchTopicDetails() {

  }

  onTopicChange(topicDisplayName: any) {
    let topic: TopicDetail = this.topicList.find(x => x.displayName == topicDisplayName);
    this.contentMgmntService.getClassDetails(topic.classId).subscribe((classDet: ClassSetupDetail) => {
      this.contentMgmntService.changeClassSetupDetail(classDet);
    });

    this.contentMgmntService.getSubjectAndClass(topic.classId, topic.subjectId).subscribe((subjectDe: SubjectSetupDetail) => {
      this.contentMgmntService.changeSubjectDetail(subjectDe);
    });

    this.contentMgmntService.getChapterForClassAndSubject(topic.classId, topic.subjectId, topic.chapterId).subscribe((chapter: ChapterSetupDetail) => {
      this.contentMgmntService.changeChapterSetupDetail(chapter);
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }




}
