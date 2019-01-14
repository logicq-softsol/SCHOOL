import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  teacherDashBoard(){
    this.router.navigate(['school/teacher/dash']);
  }

  teacherProfile(){
    this.router.navigate(['school/teacher/profile']);
  }

  teacherFavorites(){
    this.router.navigate(['school/teacher/favorites']);
  }
  logOut(){
    this.router.navigate(['/']);
  }

}
