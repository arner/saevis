import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { NZ_I18N } from 'ng-zorro-antd';
import { en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {TimeagoModule} from 'ngx-timeago';
import {environment} from '../environments/environment';

registerLocaleData(en);

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
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule,
    NgZorroAntdModule,
    ApiModule,
    ContentModule,
    TimeagoModule.forRoot()
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.apiBaseUrl },
    { provide: Configuration, useFactory: apiConfigurationFactory},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
