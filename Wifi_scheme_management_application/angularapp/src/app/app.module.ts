import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserViewAppliedRequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserViewSchemeComponent } from './components/user-view-scheme/user-view-scheme.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeCommonComponent } from './components/home-common/home-common.component';


@NgModule({
  declarations: [
  AppComponent,
  AdminViewSchemeComponent,
  AdminWifiSchemeComponent,
  AdminnavComponent,
  AdminviewappliedrequestComponent,
  AdminviewfeedbackComponent,
  DashboardComponent,
  ErrorComponent,
  HomePageComponent,
  UserViewSchemeComponent,
  UseraddfeedbackComponent,
  UseraddrequestComponent,
  UserViewAppliedRequestComponent,
  UserviewfeedbackComponent,
  UsernavComponent,
  SignupComponent,
  LoginComponent,
  HomeCommonComponent

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    {
      provide :HTTP_INTERCEPTORS,
    useClass :AuthInterceptor,
    multi :true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
