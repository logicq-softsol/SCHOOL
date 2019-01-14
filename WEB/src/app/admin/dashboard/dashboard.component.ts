import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const classList: any[] = [
  {
    name: "I", type: "STANDARD-I", enrollmentCount: "10", description: "ABout class and content details", image: "",
    subjectList: [{ name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "II", type: "STANDARD-II", enrollmentCount: "20", description: "ABout class and content details", image: "",
    subjectList: [{id: "sub1", name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "III", type: "STANDARD-III", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{id: "sub1", name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "IV", type: "STANDARD-IV", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{ id: "sub1",name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "V", type: "STANDARD-V", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{ id: "sub1",name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "VI", type: "STANDARD-VI", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{id: "sub1", name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "VII", type: "STANDARD-VII", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{id: "sub1", name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "VIII", type: "STANDARD-VIII", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{id: "sub1", name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "IX", type: "STANDARD-IX", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{id: "sub1", name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  },
  {
    name: "X", type: "STANDARD-X", enrollmentCount: "20", description: "ABout class and content details", image: "", subjectList: [{ id: "sub1",name: "Subject 1", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub1", name: "Subject 2", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub2", name: "Subject 3", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub3", name: "Subject 4", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub4", name: "Subject 5", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub5", name: "Subject 6", description: "ABout class and content details", totalChapter: 10, time: "20 HR" },
    { id: "sub6", name: "Subject 7", description: "ABout class and content details", totalChapter: 10, time: "20 HR" }
    ]
  }
];




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['name', 'type', 'enrollmentCount', 'description', 'edit_delete'];
  classDetailList = new MatTableDataSource(classList);

  constructor(public openClassSetupDialog: MatDialog,public openSubjectSetupDialog: MatDialog,public openChapterSetupDialog: MatDialog) { }

  ngOnInit() {
    this.classDetailList.paginator = this.paginator;
    this.classDetailList.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.classDetailList.filter = filterValue.trim().toLowerCase();

    if (this.classDetailList.paginator) {
      this.classDetailList.paginator.firstPage();
    }
  }

  ClassSetupDialog(): void {
    const dialogRef = this.openClassSetupDialog.open(ClassSetupDialog, {
      width: '600px',
    });
  }

  setupSubjectDialog(): void {
    const dialogRef = this.openSubjectSetupDialog.open(SubjectSetupDialog, {
      width: '600px',
    });
  }

  chapterEditDialog(): void {
    const dialogRef = this.openChapterSetupDialog.open(ChapterSetupDialog, {
      width: '600px',
    });
  }

  onClickClassDetailsView(row: any) {

  }

}

@Component({
  selector: 'class-setup-dialog',
  templateUrl: 'class-setup.html',
})
export class ClassSetupDialog {

  constructor(
    public dialogRef: MatDialogRef<ClassSetupDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

  @Component({
    selector: 'subject-setup-dialog',
    templateUrl: 'subject-setup.html',
  })
  export class SubjectSetupDialog {
  
    constructor(
      public dialogRef: MatDialogRef<SubjectSetupDialog>) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}


@Component({
  selector: 'chapter-setup-dialog',
  templateUrl: 'chapter-setup.html',
})
export class ChapterSetupDialog {

  constructor(
    public dialogRef: MatDialogRef<ChapterSetupDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}