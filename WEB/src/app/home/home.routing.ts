import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContentMgmntComponent } from './content-mgmnt/content-mgmnt.component';
import { ContentSubjectComponent } from './content-mgmnt/content-subject/content-subject.component';
import { ContentChapterComponent } from './content-mgmnt/content-subject/content-chapter/content-chapter.component';


export const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [{ path: 'contentmgmnt', component: ContentMgmntComponent },
               { path: 'contentmgmnt/subject', component: ContentSubjectComponent},
               { path: 'contentmgmnt/subject/chapter', component: ContentChapterComponent }]
  }
];

export const homeRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);
