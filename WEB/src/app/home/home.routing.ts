import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContentMgmntComponent } from './content-mgmnt/content-mgmnt.component';
import { AdminComponent } from './admin/admin.component';


export const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'teacher', component: ContentMgmntComponent }
    ]
  }
];

export const homeRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);
