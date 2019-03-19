import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserDetail } from '../public/model/user-detail';
import { ClassSetupDetail } from '../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../public/model/chapter-setup-detail';
import { ContentMgmntService } from '../home/service/content-mgmnt.service';
import { TopicDetail } from '../public/model/topic-detail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserDetail = new UserDetail();
  classList: ClassSetupDetail[] = [];
  classSubjectList: SubjectSetupDetail[] = [];
  chapterList: ChapterSetupDetail[] = [];
  topicList: TopicDetail[] = [];
  breadcurmblist: any;


  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private router: Router) {
    if (this.authService.isAuthenticate) {
      this.authService.getUserDetail().subscribe((user: UserDetail) => {
        this.user = user;
        if(user.role=='TEACHER'){
          this.router.navigate(['/home/teacher']);
        }
        if(user.role=='ADMIN'){
          this.router.navigate(['/home/admin']);
        }
      });

      this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
        this.classList = data;
      });
    }
  }

  ngOnInit() {
   // this.showClassContent();
  }

  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
    });
  }



  viewChapterList(subject: SubjectSetupDetail) {
    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
      this.chapterList = chapters;
    });
    this.contentMgmntService.changeSubjectDetail(subject);
  }

  viewTopicList(chapter: ChapterSetupDetail) {

    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.classId).subscribe((topics: TopicDetail[]) => {
      this.topicList = topics;
    });
    this.contentMgmntService.changeChapterSetupDetail(chapter);
  }

}
