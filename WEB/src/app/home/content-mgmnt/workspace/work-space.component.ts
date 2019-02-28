import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';
import { HomeService } from '../../../home/service/home.service';
import { UserDetail } from 'src/app/public/model/user-detail';

@Component({
    selector: "work-space",
    templateUrl: "work-space.html"
})
export class WorkSpaceDialog {
    user: UserDetail = new UserDetail();
    workSpaceEmmiter = new EventEmitter();
    workSpaceContent: string;

    constructor(private dialogRef: MatDialogRef<WorkSpaceDialog>, @Inject(MAT_DIALOG_DATA) private data: any,
        private authService: AuthenticationService,
        private contentMgmntService: ContentMgmntService, ) {
        this.authService.getUserDetail().subscribe((user: UserDetail) => {
            this.user = user;
        });
        this.contentMgmntService

    }

    saveWorkSpaceChange() {
        this.workSpaceEmmiter.emit(this.workSpaceContent);
        this.onNoClick();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}