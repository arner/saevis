import { NgModule } from '@angular/core';
import {ContentModule} from '../content/content.module';
import {SharedModule} from '../shared/shared.module';
import * as fromTopics from './topics.reducer';
import {StoreModule} from '@ngrx/store';
import {TopicDetailComponent} from './topic-detail/topic-detail.component';
import {TopicsComponent} from './topics/topics.component';
import {TopicsEffects} from './topics.effects';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    TopicsComponent,
    TopicDetailComponent
  ],
  imports: [
    SharedModule,
    ContentModule,
    StoreModule.forFeature('topics', fromTopics.reducer),
    EffectsModule.forFeature([TopicsEffects])
  ]
})
export class TopicsModule { }
