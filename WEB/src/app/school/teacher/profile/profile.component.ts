import { Component, OnInit,ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


const activityList: any[] = [
  { activityId: "asdbc", activityName: "STANDARD-I", activityType: "10",activitystartTime:"29-AUG-2018 00:30 PM",activityEndTime:"29-AUG-2018 02:30 PM",activityStatus:"Completed", activityDetails: "ABout class and content details"},
  { activityId: "xyzpl", activityName: "STANDARD-I", activityType: "10",activitystartTime:"29-AUG-2018 01:30 PM",activityEndTime:"29-AUG-2018 03:30 PM",activityStatus:"Completed", activityDetails: "ABout class and content details"},
  { activityId: "pqrws", activityName: "STANDARD-I", activityType: "10",activitystartTime:"27-AUG-2018 04:30 PM",activityEndTime:"27-AUG-2018 05:30 PM",activityStatus:"Completed", activityDetails: "ABout class and content details"},
  { activityId: "olpzx", activityName: "STANDARD-I", activityType: "10",activitystartTime:"27-AUG-2018 05:30 PM",activityEndTime:"27-AUG-2018 07:30 PM",activityStatus:"Completed", activityDetails: "ABout class and content details"}
];


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  activityColumns = ['activityId', 'activityName', 'activityType', 'activitystartTime', 'activityEndTime','activityStatus','activityDetails'];
  activityDetailsList = new MatTableDataSource(activityList);
  constructor() { }

  ngOnInit() {
    this.activityDetailsList.paginator = this.paginator;
    this.activityDetailsList.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.activityDetailsList.filter = filterValue.trim().toLowerCase();

    if (this.activityDetailsList.paginator) {
      this.activityDetailsList.paginator.firstPage();
    }
  }
}
