import { NgModule } from '@angular/core';
import {ContentModule} from '../content/content.module';
import {SharedModule} from '../shared/shared.module';
import * as fromTopics from './store/topics.reducer';
import {StoreModule} from '@ngrx/store';
import {TopicDetailComponent} from './topic-detail/topic-detail.component';
import {TopicsComponent} from './topics/topics.component';
import {TopicsEffects} from './store/topics.effects';
import {EffectsModule} from '@ngrx/effects';
import {TopicsRoutingModule} from './topics-routing.module';

@NgModule({
  declarations: [
    TopicsComponent,
    TopicDetailComponent
  ],
  imports: [
    SharedModule,
    ContentModule,
    TopicsRoutingModule,
    StoreModule.forFeature('topics', fromTopics.reducer),
    EffectsModule.forFeature([TopicsEffects])
  ]
})
export class TopicsModule { }
