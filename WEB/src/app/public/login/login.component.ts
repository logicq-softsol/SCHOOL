import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorage } from 'src/app/core/token.storage';
import { Router } from '@angular/router';
import { LoginDetail } from '../model/login-detail';
import { UserDetail } from '../model/user-detail';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  cpassword: string;
  displayView: string = 'LOGIN';

  constructor(private authService: AuthenticationService, private storage: TokenStorage, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.displayView = 'LOGIN';
    this.authService.checkValidateProduct().subscribe((data: any) => {
      if (data.messageCode == "NO_LICENSE") {
        this.router.navigate(['/license']);
      }
    });
  }


  activateProduct(){
    this.authService.checkValidateProduct().subscribe((data: any) => {
       if (data.messageCode == "NO_LICENSE" || data.messageCode == "PE_LICENSE") {
           this.router.navigate(['/license']);
       }else{
         this.openSnackBar("Your Product already register with this system", "CLOSE");
       }
  });
  }

  login() {
    let loginDetail: LoginDetail = new LoginDetail();
    loginDetail.userName = this.username;
    loginDetail.password = this.password;
    this.authService.login(loginDetail).subscribe((res: any) => {
      this.storage.saveToken(res.message);
      this.authService.authenticationState.next(true);
      if (this.authService.isAuthenticate) {
        this.authService.loadUser().subscribe((user: UserDetail) => {
          this.authService.changeUserDetail(user);
          this.router.navigate(['/home']);
        });

      }
    });

  }

  logout() {
    let loginDetail: LoginDetail = new LoginDetail();
    this.authService.logout();
    this.storage.signOut();
    this.authService.authenticationState.next(false);
    if (this.authService.isAuthenticate) {
      this.router.navigate(['login']);
    }
  }

  registerUser() {
    this.router.navigate(['registeruser']);
  }

  resetPassword() {
    this.displayView = 'RPASSWORD';
  }

  confirmPasswordChange() {
    if (this.password === this.cpassword) {
      let loginDetail: LoginDetail = new LoginDetail();
      loginDetail.userName = this.username;
      loginDetail.password = this.password;
      this.authService.resetPassword(loginDetail).subscribe((res: any) => {
        this.displayView = 'LOGIN';
        this.router.navigate(['login']);
        this.openSnackBar(res.messageCode, "CLOSE");
      });
    } else {
      this.displayView = 'RPASSWORD';
      this.openSnackBar("Password didn't Match,Please check ...", "CLOSE");
    }
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }

}
