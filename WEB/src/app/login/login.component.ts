import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  username: string;
  password: string;

  login(): void {
    if("TEACHER"==this.username){
      this.router.navigate(['school/teacher/dash']);
    }
     if("PRINCIPAL"==this.username){
      this.router.navigate(['school/principal']);
    }
    if("ADMIN"==this.username){
      this.router.navigate(['admin/dashboard']);
    }
  }

}
