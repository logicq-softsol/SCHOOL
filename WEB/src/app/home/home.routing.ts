import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContentMgmntComponent } from './content-mgmnt/content-mgmnt.component';
import { TopicComponent } from './content-mgmnt/topics/topic.component';
import { QuestionComponent } from './content-mgmnt/questions/question';


export const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'teacher', component: ContentMgmntComponent },
      { path: 'teacher/topics', component: TopicComponent },
      { path: 'teacher/question', component: QuestionComponent }
    ]
  }
];

export const homeRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(homeRoutes);
