import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import {
  MatCardModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
  MatIcon, MatIconModule, MatRadioModule, MatListModule, MatNativeDateModule, MatDatepickerModule, MatInputModule,
  MatSelectModule, MatDialogModule, MatSlideToggleModule, MatMenuModule
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
import { MiniBlockComponent } from './blocks/mini-block/mini-block.component';
import {IsLoggedIn} from "./guards/IsLoggedIn";

const routes: Routes = [
  {
    path: 'topics',
    component: TopicsComponent,
    canActivate: [IsLoggedIn],
    children: []
  },
  {
    path: 'topics/:id',
    component: TopicDetailComponent,
    canActivate: [IsLoggedIn]
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: '',
    redirectTo: '/topics', //'login', //'/topics',
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
    LoginComponent,
    MiniBlockComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    // RouterModule.forChild(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    SDKBrowserModule.forRoot(),
    BrowserAnimationsModule,
    // Todo make separate
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule
  ],
  providers: [MemberService, IsLoggedIn],
  bootstrap: [AppComponent],
  entryComponents: [TypeSelectorComponent]
})

export class AppModule { }
