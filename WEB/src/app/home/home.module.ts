import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { routing, homeRoutingProviders } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogicQIntercept } from '../core/logicqInterceptor';
import { ContentMgmntComponent, ClassSetupDialog } from './content-mgmnt/content-mgmnt.component';
import { CustomMaterialModule } from '../core/material.module';
import { ImageCropperModule } from "ngx-image-cropper";
import { ContentSubjectComponent, SubjectDetailDialog } from '../home/content-mgmnt/content-subject/content-subject.component';
import { ContentChapterComponent, ChapterDetailDialog } from './content-mgmnt/content-subject/content-chapter/content-chapter.component';
import { ImageUploadDialog } from './content-mgmnt/upload-file/upload-image';
import { WorkSpaceDialog } from './content-mgmnt/workspace/work-space.component';
import { NgxEditorModule } from 'ngx-editor';
import { ContentTopicComponent, TopicDetailDialog } from './content-mgmnt/content-subject/content-topic/content-topic.component';

@NgModule({
  imports: [CommonModule, routing, HttpClientModule, FormsModule, CustomMaterialModule, ReactiveFormsModule,ImageCropperModule,NgxEditorModule],
  declarations: [ContentMgmntComponent,HomeComponent,ContentSubjectComponent,ContentChapterComponent,ContentTopicComponent,ClassSetupDialog,ImageUploadDialog,SubjectDetailDialog,ChapterDetailDialog,WorkSpaceDialog,TopicDetailDialog],
  entryComponents: [ClassSetupDialog,ImageUploadDialog,SubjectDetailDialog,ChapterDetailDialog,WorkSpaceDialog,TopicDetailDialog],
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
