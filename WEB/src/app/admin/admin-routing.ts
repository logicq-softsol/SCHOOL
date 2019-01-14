import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentComponent } from './content/content.component';
import { AdminComponent } from './admin.component';
import { LicenseComponent } from './license/license.component';

export const adminRoutes: Routes = [

    {
        path: '', component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'license', component: LicenseComponent },
            { path: 'content', component: ContentComponent },
        ]
    }




];

export const adminProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(adminRoutes);