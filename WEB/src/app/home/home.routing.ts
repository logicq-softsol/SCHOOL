import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContentMgmntComponent } from './content-mgmnt/content-mgmnt.component';


export const homeRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [{ path: 'contentmgmnt', component: ContentMgmntComponent }]
  }
];

export const homeRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);
