import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LicenseComponent } from '../license/license.component';

const routes: Routes = [
     { path: '',component: LoginComponent},
     { path: 'licence',component: LicenseComponent},
     { path: 'admin', loadChildren: '../admin/admin.module#AdminModule'},
     { path: 'school', loadChildren: '../school/school.module#SchoolModule'},


     
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
