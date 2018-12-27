import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {TopicsComponent} from './topics/topics.component';
import {AuthGuard} from './auth/auth.guard';
import {TopicDetailComponent} from './topics/topic-detail/topic-detail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: 'topics',
    component: TopicsComponent,
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: 'topics/:id',
    component: TopicDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
