import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserDetail } from '../model/user-detail';
import { LoginDetail } from '../model/login-detail';
import { License } from '../model/license';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserDetail = new UserDetail();
  login: LoginDetail = new LoginDetail();
  licenseDetail: License = new License();

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {


  }


  registerNewLicense() {
    this.authService.buildNewLicense(this.licenseDetail).subscribe((data: any) => {
      if (data.messageCode == 'SUCESS') {
        this.router.navigate(['/licenselist']);
      }else{
        this.openSnackBar(data.message,"ERROR");
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}
