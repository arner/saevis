import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthModule} from './auth/auth.module';
import {ApiModule} from './api/api.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BASE_PATH} from './api/variables';
import { TopicsComponent } from './topics/topics.component';
import {Configuration} from './api/';
import {apiConfigurationFactory} from './apiConfigurationFactory';
import {ErrorInterceptor} from './error.interceptor';
import { TopicDetailComponent } from './topics/topic-detail/topic-detail.component';
import {ContentModule} from './content/content.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopicsComponent,
    TopicDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule,
    ApiModule,
    ContentModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: 'http://localhost:3000' },
    { provide: Configuration, useFactory: apiConfigurationFactory},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
