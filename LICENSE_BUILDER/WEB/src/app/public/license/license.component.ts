import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';
import { License } from '../model/license';


@Component({
  selector: 'app-register',
  templateUrl: './license.html',
  styleUrls: ['./license.scss']
})
export class LicenseComponent implements OnInit {
  displayedColumns: string[] = ['hostName', 'activationDate', 'validityDay'];
  licenseList: License[] = [];
  dataSource = new MatTableDataSource<License>(this.licenseList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    if (this.authService.isAuthenticate) {
      this.authService.licensedList().subscribe((licList: License[]) => {
        this.licenseList = licList;
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  registerNewLicense(){
    this.router.navigate(['/register']);
  }

}
