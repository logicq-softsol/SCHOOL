import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ContentMgmntService } from '../../../../home/service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ImageUploadDialog } from '../../../../home/content-mgmnt/upload-file/upload-image';
import { HomeService } from '../../../../home/service/home.service';
import { WorkSpaceDialog } from '../../workspace/work-space.component';
import { ClassSetupDetail } from '../../../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../../../public/model/subject-setup-detail';
import { ChapterSetupDetail } from '../../../../public/model/chapter-setup-detail';
import { TopicDetail } from '../../../../public/model/topic-detail';
import { UserDetail } from '../../../../public/model/user-detail';


@Component({
  selector: 'app-content-topic',
  templateUrl: './content-topic.html',
  styleUrls: ['./content-topic.scss']
})
export class ContentTopicComponent implements OnInit {

  classDetail: ClassSetupDetail = new ClassSetupDetail();
  classList: ClassSetupDetail[] = [];

  subjectList: SubjectSetupDetail[] = [];
  subjectDetail: SubjectSetupDetail = new SubjectSetupDetail();

  chapter: ChapterSetupDetail = new ChapterSetupDetail();
  chapterList: ChapterSetupDetail[] = [];

  topic: TopicDetail = new TopicDetail();
  topics: TopicDetail[] = [];


  user: UserDetail = new UserDetail();
  selectImage: File;
  imageUrl: string;

  constructor(private authService: AuthenticationService,
    private contentMgmntService: ContentMgmntService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogProfileImage: MatDialog,
    private homeService: HomeService) { }

  ngOnInit() {

    this.authService.getUserDetail().subscribe((user: UserDetail) => {
      this.user = user;
    });
    this.contentMgmntService.getClassDetailList().subscribe((data: ClassSetupDetail[]) => {
      this.classList = data;
    });

    this.contentMgmntService.getClassSetupDetail().subscribe((classDetail: ClassSetupDetail) => {
      this.classDetail = classDetail;
      this.showClassSubjectList(classDetail);
    });
    this.contentMgmntService.getSubjectDetail().subscribe((subject: SubjectSetupDetail) => {
      this.subjectDetail = subject;
      this.contentMgmntService.getChapterListForSubjectAndClass(this.subjectDetail.classId, this.subjectDetail.id).subscribe((chapters: ChapterSetupDetail[]) => {
        this.chapterList = chapters;
      });
    });
    this.contentMgmntService.getChapterSetupDetail().subscribe((chapter: ChapterSetupDetail) => {
      this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.classId).subscribe((topics: TopicDetail[]) => {
        this.topics = topics;
      });
    });

  }

  userYourWorkSpace(chapter: ChapterSetupDetail) {
    const dialogRef = this.dialog.open(WorkSpaceDialog, {
      width: '700px',
      data: {
        type: "ADD",
        chapterDetail: chapter
      }
    });

    dialogRef.componentInstance.workSpaceEmmiter.subscribe((workSpaceContent: any) => {

    });
  }

  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.subjectList = subjectList;
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
      topicDetail.classId = this.classDetail.id;
      topicDetail.subjectId = this.subjectDetail.id;
      topicDetail.chapterId = this.chapter.id;
      this.contentMgmntService.setupTopicDetails(topicDetail).subscribe((topicDetail: TopicDetail) => {
        this.snackBar.open(" Topic Added Sucessfully. ", "CLOSE");
        this.contentMgmntService.getTopicListForChapterForSubjectAndClass(topicDetail.classId, topicDetail.subjectId, topicDetail.chapterId).subscribe((topics: TopicDetail[]) => {
          this.topics = topics;
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
          this.topics = topics;
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
          this.topics = topics;
        });
      });
    });
  }


  onChangeImage(topic: TopicDetail) {
    const dialogRef = this.dialogProfileImage.open(
      ImageUploadDialog,
      {
        width: "600px"
      }
    );
    dialogRef.componentInstance.uploadImageEmmiter.subscribe(data => {
      this.selectImage = data;
      this.homeService
        .uploadImagesForTopic(this.selectImage, topic)
        .subscribe((data: any) => {
          this.imageUrl = data.fileDownloadUri;
        });
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}




@Component({
  selector: 'topic-setup-dialog',
  templateUrl: 'topic-setup-dialog.html',
  styleUrls: ['./content-topic.scss']
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
