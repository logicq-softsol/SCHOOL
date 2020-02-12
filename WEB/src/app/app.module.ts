import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogicQIntercept } from './core/logicqInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/material.module';
import { FormsModule } from '@angular/forms';
import { TokenStorage } from './core/token.storage';
import { LicenseComponent } from './public/license/license.component';
import { createCustomElement } from '@angular/elements';
import { SliderComponent } from './public/slider/slider.component';
import { TopicDisplayDialog } from './home/home.component';
import { DocumentViewModule } from 'ngx-document-view';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LicenseComponent,
    SliderComponent,
    TopicDisplayDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterialModule,
    HttpClientModule,
    DocumentViewModule
  ],
  entryComponents: [SliderComponent,TopicDisplayDialog],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LogicQIntercept,
    multi: true
  }, TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const slider = createCustomElement(SliderComponent, { injector });
    customElements.define('motley-slider', slider);
  }

}
