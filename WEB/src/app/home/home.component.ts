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
  breadcurmblist = ['HOME'];


  constructor(private authService: AuthenticationService, private contentMgmntService: ContentMgmntService, private router: Router) {
    if (this.authService.isAuthenticate) {
      this.authService.getUserDetail().subscribe((user: UserDetail) => {
        this.user = user;
      });
    }
  }

  ngOnInit() {
   this.showClassContent();
  }


  onclickBreadcrumb(value: any) {
    const index: number = this.breadcurmblist.indexOf(value);
    if (index !== -1) {
      this.breadcurmblist.splice(index, 1);
    }
    if(value=='CLASS'){
     this.showClassContent();
    }
    if(value=='SUBJECT'){
      this.router.navigate(['/home/contentmgmnt/subject']);
    }
    if(value=='CHAPTER'){
      this.router.navigate(['/home/contentmgmnt/subject/chapter']);
    }
    if(value=='TOPIC'){
      this.router.navigate(['/home/contentmgmnt/subject/chapter/topic']);
    }
  }

showClassContent(){
  const index: number = this.breadcurmblist.indexOf('CLASS');
  if (index == -1) {
    this.breadcurmblist.push('CLASS');
  }

  this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
    this.classList = data;
  });
  
  this.router.navigate(['/home/contentmgmnt']);
}

  showClassSubjectList(classSetup: ClassSetupDetail) {
    const index: number = this.breadcurmblist.indexOf('SUBJECT');
    if (index == -1) {
      this.breadcurmblist.push('SUBJECT');
    }

    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.classSubjectList = subjectList;
    });

    this.router.navigate(['/home/contentmgmnt/subject']);
  }



  viewChapterList(subject: SubjectSetupDetail) {
    const index: number = this.breadcurmblist.indexOf('CHAPTER');
    if (index == -1) {
      this.breadcurmblist.push('CHAPTER');
    }

    this.contentMgmntService.getChapterListForSubjectAndClass(subject.classId, subject.id).subscribe((chapters: ChapterSetupDetail[]) => {
      this.chapterList = chapters;
    });
    this.contentMgmntService.changeSubjectDetail(subject);
    this.router.navigate(['/home/contentmgmnt/subject/chapter']);
  }

  viewTopicList(chapter: ChapterSetupDetail) {
    const index: number = this.breadcurmblist.indexOf('TOPIC');
    if (index == -1) {
      this.breadcurmblist.push('TOPIC');
    }

    this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.classId).subscribe((topics: TopicDetail[]) => {
      this.topicList = topics;
    });
    this.contentMgmntService.changeChapterSetupDetail(chapter);
    this.router.navigate(['/home/contentmgmnt/subject/chapter/topic']);
  }

}
