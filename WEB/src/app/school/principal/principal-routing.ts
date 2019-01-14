import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentComponent } from './content/content.component';

export const principalRoutes: Routes = [
    {
        path: '', component: PrincipalComponent,
        children: [
            { path: '', component:  DashboardComponent} ,
            { path: 'content', component:  ContentComponent}      
        ]
    }
];

export const principalProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forChild(principalRoutes);