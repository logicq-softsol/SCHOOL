import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../core/material.module';
import { AdminComponent } from './admin.component';
import { ContentComponent,DynamicDataSource ,DynamicDatabase} from './content/content.component';
import { DashboardComponent,ClassSetupDialog,SubjectSetupDialog,ChapterSetupDialog } from './dashboard/dashboard.component';
import { adminProviders, routing } from './admin-routing';
import{LicenseComponent} from './license/license.component';


@NgModule({
  declarations: [
    AdminComponent,
    ContentComponent,
    DashboardComponent,
    ClassSetupDialog,
    SubjectSetupDialog,
    ChapterSetupDialog,
    LicenseComponent
  ],
  imports: [CustomMaterialModule,FormsModule,routing,CommonModule,ReactiveFormsModule
  ],
  providers: [adminProviders,DynamicDataSource,DynamicDatabase],
  bootstrap: [AdminComponent],
  entryComponents: [ClassSetupDialog,SubjectSetupDialog,ChapterSetupDialog],
})
export class AdminModule { }
