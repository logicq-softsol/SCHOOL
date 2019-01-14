import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolComponent } from './school.component';
import { TeacherComponent } from './teacher/teacher.component';

export const schoolRoutes: Routes = [
    {
        path: '', component: SchoolComponent,
        children: [
            { path: 'principal', loadChildren: './principal/principal.module#PrincipalModule'},
            { path: 'teacher', loadChildren: './teacher/teacher.module#TeacherModule'},
        ]
    }
];

export const schoolProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(schoolRoutes);