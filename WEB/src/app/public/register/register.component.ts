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
  roles: any[] = ["TEACHER","ADMIN"];
  role:any;

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  
  }

  onChangeRole(urole){
    this.user.role=urole;
  }

  confirmRegisterUser() {
    this.productDetail.user = this.user;
    this.login.user = this.user;
    this.authService.registerUserForProduct(this.login).subscribe((data: any) => {
      if (data.messageCode == "SREG") {
        this.router.navigate(['/login']);
        this.openSnackBar(data.message, 'CLOSE');
      } else if (data.messageCode == "AREG") {
        this.router.navigate(['/login']);
        this.openSnackBar(data.message, 'CLOSE');
      }else if (data.messageCode == "AREGA") {
        this.router.navigate(['/login']);
        this.openSnackBar(data.message, 'CLOSE');
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}
