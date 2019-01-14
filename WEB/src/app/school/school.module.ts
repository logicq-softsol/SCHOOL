import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../core/material.module';
import { schoolProviders, routing } from './school-routing';
import { SchoolComponent } from './school.component';

@NgModule({
  declarations: [
    SchoolComponent 
  ],
  imports: [CustomMaterialModule,FormsModule,routing
  ],
  providers: [schoolProviders],
  bootstrap: [SchoolComponent]
})
export class SchoolModule { }
