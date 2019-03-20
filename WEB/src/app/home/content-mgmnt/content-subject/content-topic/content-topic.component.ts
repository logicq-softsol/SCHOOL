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
import { VideoUploadDialog } from '../../../../home/content-mgmnt/upload-file/upload-video';
import { Favorites } from '../../../../public/model/favorite';

@Component({
  selector: 'app-content-topic',
  templateUrl: './content-topic.html',
  styleUrls: ['./content-topic.scss']
})
export class ContentTopicComponent implements OnInit {

  classSetupDetail: ClassSetupDetail = new ClassSetupDetail();
  subjectDetail: SubjectSetupDetail = new SubjectSetupDetail();
  chapter: ChapterSetupDetail = new ChapterSetupDetail();
  chapterList: ChapterSetupDetail[] = [];

  topic: TopicDetail = new TopicDetail();
  topics: TopicDetail[] = [];

  selectImage: File;
  imageUrl: string;
  preload: string = 'auto';


  constructor(private authService: AuthenticationService,
    private contentMgmntService: ContentMgmntService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogProfileImage: MatDialog,
    private homeService: HomeService) { }

  ngOnInit() {
    this.contentMgmntService.getClassSetupDetail().subscribe((classDetail: ClassSetupDetail) => {
      this.classSetupDetail = classDetail;
      this.contentMgmntService.getSubjectDetail().subscribe((subject: SubjectSetupDetail) => {
        this.subjectDetail = subject;
      });
    });
    this.contentMgmntService.getChapterSetupDetail().subscribe((chapter: ChapterSetupDetail) => {
      this.chapter = chapter;
      this.contentMgmntService.getTopicListForChapterForSubjectAndClass(chapter.classId, chapter.subjectId, chapter.id).subscribe((topics: TopicDetail[]) => {
        this.topics = topics;
      });
    });

  }

  playLessonForTopic() {
    //this.api = api;
    this.contentMgmntService.loadVideoFile().subscribe((data) => {
      let file = new Blob([data], { type: 'video/mp4' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }


  markFavorites(topic: TopicDetail) {
    let favorite: Favorites = new Favorites();
    favorite.type = "TOPIC";
    favorite.typeValue = topic.id;
    this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Subject " + topic.displayName + " mark favorite.", "CLOSE");
    });
  }



  removeFavorites(topic: TopicDetail) {
    this.contentMgmntService.removeFavorites("TOPIC", topic.id).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Topic " + topic.displayName + " remove from your favorite.", "CLOSE");
    });
  }



  uploadVideo(topic: TopicDetail) {
    const dialogRef = this.dialog.open(VideoUploadDialog, {
      width: '700px',
      data: {
        type: "ADD",
        topic: topic
      }
    });
    dialogRef.componentInstance.uploadVideoEmmiter.subscribe((fileInput: any) => {

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
      this.contentMgmntService
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



