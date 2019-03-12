import { Component, OnInit } from '@angular/core';
import { Activation } from '../model/product-detail';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserDetail } from '../model/user-detail';
import { LoginDetail } from '../model/login-detail';
import { License } from 'src/app/public/model/license';


@Component({
  selector: 'app-register',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {
  licnkey: License = new License();

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

  }


  registerProduct() {
    this.authService.activateProduct(this.licnkey).subscribe((data: any) => {
      if (data.messageCode == "SUCESS") {
        this.router.navigate(['/login']);
      }
    });
  }

}
