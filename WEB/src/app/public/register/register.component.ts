import { Component, OnInit } from '@angular/core';
import { Activation } from '../model/product-detail';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserDetail } from '../model/user-detail';
import { LoginDetail } from '../model/login-detail';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  productDetail: Activation = new Activation();
  user: UserDetail = new UserDetail();
  login: LoginDetail = new LoginDetail();
  roles: any[] = [{
    value: "TEACHER",
    displayValue: "TEACHER"
  }, {
    value: "ADMIN",
    displayValue: "ADMIN"
  }];


  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  
  }


  confirmRegisterUser() {
    this.user.role='TEACHER';
    this.productDetail.user = this.user;
    this.login.user = this.user;
    this.authService.registerUserForProduct(this.login).subscribe((data: any) => {
      if (data.messageCode == "SREG") {
        this.router.navigate(['/login']);
        this.openSnackBar(data.message, data.messageCode);
      } else if (data.messageCode == "AREG") {
        this.router.navigate(['/login']);
        this.openSnackBar(data.message, data.messageCode);
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}
