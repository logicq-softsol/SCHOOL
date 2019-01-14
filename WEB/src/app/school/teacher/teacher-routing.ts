import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

export const teacherRoutes: Routes = [
    {
        path: '', component: TeacherComponent,
        children: [
            { path: 'dash', component:  DashboardComponent} ,
            { path: 'profile', component:  ProfileComponent}      
        ]
    }
];

export const teacherProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(teacherRoutes);