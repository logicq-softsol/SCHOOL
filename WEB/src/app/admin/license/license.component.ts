import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


const licenseList: any[] = [
  {schoolname: "ABC", classname: "STANDARD-I", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-II", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-III", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-IV", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-V", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-VI", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-VII", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-VII", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-IX", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
  {schoolname: "ABC", classname: "STANDARD-X", creationdate: "29-07-2018 02:45 AM", expirydate: "29-08-2018 02:45 AM", currentStatus: "ACTIVE"},
];


@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  licenseColumns = ['schoolname', 'classname', 'creationdate', 'expirydate', 'currentStatus'];
  licenseDetailList = new MatTableDataSource(licenseList);
  
  constructor() { }

  ngOnInit() {
    this.licenseDetailList.paginator = this.paginator;
    this.licenseDetailList.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.licenseDetailList.filter = filterValue.trim().toLowerCase();

    if (this.licenseDetailList.paginator) {
      this.licenseDetailList.paginator.firstPage();
    }
  }



}






