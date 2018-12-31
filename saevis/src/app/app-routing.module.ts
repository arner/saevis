import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {TopicsComponent} from './topics/topics.component';
import {AuthGuard} from './auth/auth.guard';
import {TopicDetailComponent} from './topics/topic-detail/topic-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'topics',
        canActivate: [AuthGuard],
        data: {
          breadcrumb: 'Topics'
        },
        children: [
          {
            path: '',
            component: TopicsComponent,
            data: {
              breadcrumb: 'All'
            }
          },
          {
            path: ':id',
            component: TopicDetailComponent,
            data: {
              breadcrumb: 'Detail'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
