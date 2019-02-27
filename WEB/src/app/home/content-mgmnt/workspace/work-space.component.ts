import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContentMgmntService } from '../../service/content-mgmnt.service';
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';
import { HomeService } from '../../../home/service/home.service';

@Component({
    selector: "work-space",
    templateUrl: "work-space.html"
})
export class WorkSpaceDialog {

    constructor(private authService: AuthenticationService,
        private contentMgmntService: ContentMgmntService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private dialogProfileImage: MatDialog,
        private router: Router,
        private homeService: HomeService) {
    
      }

    ngOnInit() {}

}