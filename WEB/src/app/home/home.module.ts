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

@NgModule({
  imports: [CommonModule, routing, HttpClientModule, FormsModule, CustomMaterialModule, ReactiveFormsModule,ImageCropperModule],
  declarations: [ContentMgmntComponent,HomeComponent,ContentSubjectComponent,ContentChapterComponent,ClassSetupDialog,ImageUploadDialog,SubjectDetailDialog,ChapterDetailDialog],
  entryComponents: [ClassSetupDialog,ImageUploadDialog,SubjectDetailDialog,ChapterDetailDialog],
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
