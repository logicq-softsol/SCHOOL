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
  roles: [] = [];


  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.authService.loadRole().subscribe((data:[]) => {
      this.roles = data;
    });

  }


  registerProduct() {
    this.productDetail.user = this.user;
    this.productDetail.login = this.login;
    // this.authService.activateProduct(this.productDetail).subscribe((data: any) => {
    //   this.router.navigate(['/login']);
    //   this.openSnackBar(data.message, data.messageCode);
    // });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}
