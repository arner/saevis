import { Component } from '@angular/core';
import {Topic} from '../../api/model/topic';
import {TopicService} from '../../api/api/topic.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import * as fromTopics from '../topics.reducer';
import {Store} from '@ngrx/store';
import * as topicsActions from '../topics.actions';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent {
  public topic: Observable<Topic>;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private store: Store<fromTopics.State>
  ) {
    this.topic = this.store.select(fromRoot.getCurrentTopic);

    // TODO add route to state
    this.route.params.subscribe(params => {
      this.store.dispatch(new topicsActions.SelectTopic(params['id']));
    });
  }

  public save(topic: Topic): void {
    this.topicService.topicsIdPut(topic, topic.id).subscribe((updatedTopic: Topic) => {
      // this.topic.updatedAt = updatedTopic.updatedAt;
    }, (err: Error) => {
      console.warn(err.message);
    });
  }
}
