import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

// ngrx
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CustomSerializer, reducers} from './store/app.reducer';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {storeFreeze} from 'ngrx-store-freeze';

// API
import {ApiModule} from './api/api.module';
import {BASE_PATH} from './api/variables';
import {Configuration} from './api/';
import {apiConfigurationFactory} from './apiConfigurationFactory';

import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import {TimeagoModule} from 'ngx-timeago';

import {ErrorInterceptor} from './error.interceptor';
import {environment} from '../environments/environment';

import {AuthModule} from './auth/auth.module';
import {LoginComponent} from './login/login.component';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {ContentModule} from './content/content.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    NgZorroAntdModule,
    ApiModule,
    ContentModule, // Eager load for now
    TimeagoModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers: [storeFreeze]}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument(),
    AppRoutingModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.apiBaseUrl },
    { provide: RouterStateSerializer, useClass: CustomSerializer},
    { provide: Configuration, useFactory: apiConfigurationFactory},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
