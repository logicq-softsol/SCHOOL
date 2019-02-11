import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthenticationService,private router: Router) {
    if (this.authService.isAuthenticate) {
      this.router.navigate(['/home/contentmgmnt']);
    }
   }

  ngOnInit() {
    
  }

}
