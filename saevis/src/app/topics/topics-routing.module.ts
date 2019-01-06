import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopicsComponent} from './topics/topics.component';
import {TopicDetailComponent} from './topic-detail/topic-detail.component';
import {TopicsGuard} from './topics.guard';
import {TopicDetailGuard} from './topic-detail.guard';

const routes: Routes = [
  {
    path: '',
    component: TopicsComponent,
    canActivate: [TopicsGuard],
    data: {
      breadcrumb: 'All'
    }
  },
  {
    path: ':topicId',
    component: TopicDetailComponent,
    canActivate: [TopicDetailGuard],
    data: {
      breadcrumb: 'Detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [TopicsGuard, TopicDetailGuard],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
