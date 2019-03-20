import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { ClassSetupDetail } from '../../../public/model/class-setup-detail';
import { SubjectSetupDetail } from '../../../public/model/subject-setup-detail';
import { ContentMgmntService } from '../../../home/service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetail } from '../../../public/model/user-detail';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { ImageUploadDialog } from '../../../home/content-mgmnt/upload-file/upload-image';
import { HomeService } from '../../../home/service/home.service';
import { Favorites } from 'src/app/public/model/favorite';

@Component({
  selector: 'app-content-subject',
  templateUrl: './content-subject.component.html',
  styleUrls: ['./content-subject.component.scss']
})
export class ContentSubjectComponent implements OnInit {

  classDetail: ClassSetupDetail = new ClassSetupDetail();
  classList: ClassSetupDetail[] = [];

  subjectList: SubjectSetupDetail[] = [];
  subjectDetail: SubjectSetupDetail = new SubjectSetupDetail();

  user: UserDetail = new UserDetail();
  selectImage: File;
  imageUrl: string;

  constructor(private authService: AuthenticationService,
    private contentMgmntService: ContentMgmntService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogProfileImage: MatDialog,
    private router: Router,
    private homeService: HomeService) {

  }

  ngOnInit() {
    this.contentMgmntService.getClassSetupDetail().subscribe((classDetail: ClassSetupDetail) => {
      this.classDetail = classDetail;
      this.contentMgmntService.getSubjectListForClass(classDetail.id).subscribe((subjectList: SubjectSetupDetail[]) => {
        this.subjectList = subjectList;
      });
    });

  }

  showChapterList(classDet: ClassSetupDetail, subjectDe: SubjectSetupDetail) {
    this.contentMgmntService.changeSubjectDetail(subjectDe);
    this.router.navigate(['/home/contentmgmnt/subject/chapter']);
  }


  showClassSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.getSubjectListForClass(classSetup.id).subscribe((subjectList: SubjectSetupDetail[]) => {
      this.subjectList = subjectList;
    });
  }



  viewChapterList(subject: SubjectSetupDetail) {
    this.contentMgmntService.changeSubjectDetail(subject);
    this.router.navigate(['/home/contentmgmnt/subject/chapter']);
  }

  viewSubjectList(classSetup: ClassSetupDetail) {
    this.contentMgmntService.changeClassSetupDetail(classSetup);
    this.router.navigate(['/home/contentmgmnt/subject']);
  }

  userWorkkSpace(subject: SubjectSetupDetail) {

  }

  markFavorites(subject: SubjectSetupDetail) {
    let favorite: Favorites = new Favorites();
    favorite.type = "SUBJECT";
    favorite.typeValue = subject.id;
    this.contentMgmntService.markFavorites(favorite).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Subject " + subject.displayName + " mark favorite.", "CLOSE");
    });
  }


  

  removeFavorites(subject: SubjectSetupDetail) {
    this.contentMgmntService.removeFavorites("SUBJECT", subject.id).subscribe((fav: Favorites) => {
      this.openErrorSnackBar("Class " + subject.displayName + " remove from your favorite.", "CLOSE");
    });
  }


  onChangeImage(subject: SubjectSetupDetail) {
    const dialogRef = this.dialogProfileImage.open(
      ImageUploadDialog,
      {
        width: "600px"
      }
    );
    dialogRef.componentInstance.uploadImageEmmiter.subscribe(data => {
      this.selectImage = data;
      this.homeService
        .uploadImagesForSubject(this.selectImage, subject)
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
