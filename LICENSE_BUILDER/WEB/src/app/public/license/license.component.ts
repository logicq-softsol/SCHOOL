import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { License } from '../model/license';


@Component({
  selector: 'app-register',
  templateUrl: './license.html',
  styleUrls: ['./license.scss']
})
export class LicenseComponent implements OnInit {
  displayedColumns: string[] = ['hostName', 'activationDate', 'validityDay', 'download'];
  licenseList: License[] = [];
  dataSource = new MatTableDataSource<License>(this.licenseList);
  today = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    if (this.authService.isAuthenticate) {
      this.authService.licensedList().subscribe((licList: License[]) => {
        this.dataSource = new MatTableDataSource<License>(licList);
        this.licenseList = licList;
      });
    }
  }

  editLicense(license: License) {
    const dialogRef = this.dialog.open(DateChangeDialog, {
      width: "650px",
      data: license
    });

    dialogRef.componentInstance.numberofDays.subscribe((days: string) => {
      this.authService.updateLicense(license,days).subscribe((data: any) => {
        this.snackBar.open(license.hostName,
          "License Extended Sucessfully for more  "+days+"  days" ,
          {
            duration: 5000
          }
        );

      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  registerNewLicense() {
    this.router.navigate(['/register']);
  }
}

@Component({
  selector: 'change-date-dialog',
  templateUrl: 'change-date-dialog.html',
})
export class DateChangeDialog {
  numberofDays = new EventEmitter();
  license: License;
  days: string;
  constructor(
    public dialogRef: MatDialogRef<DateChangeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: License) {
    this.license = data;

  }

  confirmDays() {
    this.numberofDays.emit(this.days);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


