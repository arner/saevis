import {Component, OnInit} from '@angular/core';
import {Topic} from '../../api/model/topic';
import {TopicService} from '../../api/api/topic.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromTopics from '../store/topics.reducer';
import * as topicsSelectors from '../store/topics.selectors';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  public topic$: Observable<Topic>;

  constructor(
    private topicService: TopicService,
    private store: Store<fromTopics.State>
  ) {
  }

  ngOnInit() {
    this.topic$ = this.store.select(topicsSelectors.getSelectedTopic);
  }

  public save(topic: Topic): void {
    this.topicService.topicsIdPut(topic, topic.id).subscribe((updatedTopic: Topic) => {
      // this.topic.updatedAt = updatedTopic.updatedAt;
    }, (err: Error) => {
      console.warn(err.message);
    });
  }
}
