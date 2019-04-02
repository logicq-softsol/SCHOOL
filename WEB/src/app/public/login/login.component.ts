import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorage } from 'src/app/core/token.storage';
import { Router } from '@angular/router';
import { LoginDetail } from '../model/login-detail';
import { UserDetail } from '../model/user-detail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthenticationService, private storage: TokenStorage, private router: Router) { }

  ngOnInit() {
    this.authService.checkValidateProduct().subscribe((data: any) => {
      if (data.messageCode == "NO_LICENSE") {
        this.router.navigate(['/license']);
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

  registerUser(){
    this.router.navigate(['registeruser']);
  }

}
