import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './public/register/register.component';
import { LicenseComponent } from 'src/app/public/license/license.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'license', component: LicenseComponent },
  { path: 'registeruser', component: RegisterComponent },
  { path: 'home', canActivate: [AuthGuardService], loadChildren: './home/home.module#HomeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
