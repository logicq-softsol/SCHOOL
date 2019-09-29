import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { routing, homeRoutingProviders } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogicQIntercept } from '../core/logicqInterceptor';
import { ContentMgmntComponent } from './content-mgmnt/content-mgmnt.component';
import { CustomMaterialModule } from '../core/material.module';
import { ImageCropperModule } from "ngx-image-cropper";
import { TopicComponent, TopicDetailDialog, ChapterDetailDialog, SubjectDetailDialog, ClassSetupDialog, VideoDialog } from './content-mgmnt/topics/topic.component';
import { QuestionComponent, CorrectAnswerDialog } from './content-mgmnt/questions/question';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [CommonModule, routing, HttpClientModule, FormsModule, CustomMaterialModule, ReactiveFormsModule,
    ImageCropperModule,
    MatExpansionModule,
    MatRadioModule  ],
  declarations: [ContentMgmntComponent, HomeComponent,TopicComponent , ClassSetupDialog, SubjectDetailDialog, ChapterDetailDialog,TopicDetailDialog,VideoDialog,QuestionComponent,CorrectAnswerDialog],
  entryComponents: [ClassSetupDialog, SubjectDetailDialog, ChapterDetailDialog, TopicDetailDialog,VideoDialog,CorrectAnswerDialog],
  providers: [
    homeRoutingProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogicQIntercept,
      multi: true
    }],

  bootstrap: [HomeComponent]
})
export class HomeModule { }
