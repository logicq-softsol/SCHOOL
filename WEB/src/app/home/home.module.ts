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
import { ContentTopicComponent, TopicDetailDialog } from './content-mgmnt/content-subject/content-topic/content-topic.component';
import { VideoUploadDialog } from './content-mgmnt/upload-file/upload-video';
import { TeacherRegisterComponent, UserRegDialog } from './teacher/teacher-register.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

@NgModule({
  imports: [CommonModule, routing, HttpClientModule, FormsModule, CustomMaterialModule, ReactiveFormsModule, ImageCropperModule, VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule],
  declarations: [ContentMgmntComponent, HomeComponent, ContentSubjectComponent, ContentChapterComponent, ContentTopicComponent, ClassSetupDialog, ImageUploadDialog, SubjectDetailDialog, ChapterDetailDialog, WorkSpaceDialog, TopicDetailDialog, VideoUploadDialog, UserRegDialog
    , TeacherRegisterComponent],
  entryComponents: [ClassSetupDialog, ImageUploadDialog, SubjectDetailDialog, ChapterDetailDialog, WorkSpaceDialog, TopicDetailDialog, VideoUploadDialog, UserRegDialog],
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
