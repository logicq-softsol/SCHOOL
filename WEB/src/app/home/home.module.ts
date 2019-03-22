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
import { ImageUploadDialog } from './content-mgmnt/upload-file/upload-image';
import { WorkSpaceDialog } from './content-mgmnt/workspace/work-space.component';
import { VideoUploadDialog } from './content-mgmnt/upload-file/upload-video';
import { AdminComponent, ClassSetupDialog, SubjectDetailDialog, ChapterDetailDialog, TopicDetailDialog, ChapterListDialog } from './admin/admin.component';
import { TopicComponent } from './content-mgmnt/topics/topic.component';

@NgModule({
  imports: [CommonModule, routing, HttpClientModule, FormsModule, CustomMaterialModule, ReactiveFormsModule, ImageCropperModule],
  declarations: [ContentMgmntComponent, HomeComponent,TopicComponent , ClassSetupDialog, ImageUploadDialog, SubjectDetailDialog, ChapterDetailDialog, WorkSpaceDialog, TopicDetailDialog, VideoUploadDialog
    , AdminComponent,ChapterListDialog],
  entryComponents: [ClassSetupDialog, ImageUploadDialog, SubjectDetailDialog, ChapterDetailDialog, WorkSpaceDialog, TopicDetailDialog, VideoUploadDialog,ChapterListDialog],
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
