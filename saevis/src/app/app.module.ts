import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import {
  MdCardModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdSidenavModule,
  MdIconModule, MdRadioModule, MdListModule, MdNativeDateModule, MdDatepickerModule, MdInputModule,
  MdSelectModule, MdDialogModule, MdSlideToggleModule, MdMenuModule, MdChipsModule
} from '@angular/material';
import { TopicsComponent } from './topics/topics.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FullBlockComponent } from './blocks/full-block/full-block.component';
import { PollComponent } from './blocks/poll/poll.component';
import { TopicDetailComponent } from './topics/topic-detail/topic-detail.component';
import { EventComponent } from './blocks/event/event.component';
import { TypeSelectorComponent } from './blocks/type-selector/type-selector.component';
import { LoginComponent } from './login/login.component';
import {MemberService} from './member.service';


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
    FullBlockComponent,
    PollComponent,
    TopicDetailComponent,
    EventComponent,
    TypeSelectorComponent,
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
    // Todo make separate module
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdRadioModule,
    MdListModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdSelectModule,
    MdDialogModule,
    MdSlideToggleModule,
    MdMenuModule,
    MdChipsModule
  ],
  providers: [MemberService],
  bootstrap: [AppComponent],
  entryComponents: [TypeSelectorComponent]
})

export class AppModule { }
