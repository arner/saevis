import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { TopicsComponent } from './topics/topics.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TopicDetailComponent } from './topics/topic-detail/topic-detail.component';
import { LoginComponent } from './login/login.component';
import {MemberService} from './member.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {BlocksModule} from './blocks/blocks.module';


const routes: Routes = [
  {
    path: 'topics',
    component: TopicsComponent,
    children: []
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: 'topics/:id',
    component: TopicDetailComponent,
  },
  {
    path: '',
    redirectTo: '/login', //'login', //'/topics',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    ToolbarComponent,
    TopicDetailComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    // RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SDKBrowserModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    BlocksModule,
  //  FlexLayoutModule,
  ],
  providers: [MemberService],
  bootstrap: [AppComponent]
})

export class AppModule { }
