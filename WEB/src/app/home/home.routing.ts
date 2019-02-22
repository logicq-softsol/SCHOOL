import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContentMgmntComponent } from './content-mgmnt/content-mgmnt.component';
import { ContentSubjectComponent } from './content-mgmnt/content-subject/content-subject.component';


export const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [{ path: 'contentmgmnt', component: ContentMgmntComponent },
               { path: 'contentmgmnt/subject', component: ContentSubjectComponent }]
  }
];

export const homeRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);
