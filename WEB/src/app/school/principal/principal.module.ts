import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './principal.component';
import { CustomMaterialModule } from '../../core/material.module';
import { principalProviders, routing } from './principal-routing';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    ContentComponent,
    DashboardComponent
  ],
  imports: [CustomMaterialModule,FormsModule,routing
  ],
  providers: [principalProviders],
  bootstrap: [PrincipalComponent]
})
export class PrincipalModule { }
