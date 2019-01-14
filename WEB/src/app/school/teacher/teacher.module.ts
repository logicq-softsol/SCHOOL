import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../core/material.module';
import { TeacherComponent } from './teacher.component';
import { teacherProviders, routing } from './teacher-routing';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent,DynamicDataSource ,DynamicDatabase } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    TeacherComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [CustomMaterialModule,FormsModule,routing
  ],
  providers: [teacherProviders,DynamicDataSource,DynamicDatabase],
  bootstrap: [TeacherComponent]
})
export class TeacherModule { }
