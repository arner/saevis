import { Component, OnInit } from '@angular/core';
import {Topic} from '../../api/model/topic';
import {Observable} from 'rxjs';
import {TopicService} from '../../api/api/topic.service';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as topicsActions from '../topics.actions';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  private topics: Observable<Topic[]>;

  constructor(
    private topicService: TopicService,
    private store: Store<fromRoot.State>
  ) {
    this.topics = this.store.pipe(select(fromRoot.getAllTopics));
  }

  ngOnInit() {
    this.refresh();
  }

  public refresh() {
    this.store.dispatch(new topicsActions.GetTopics());
  }

  public create() {
    this.topicService.topicsPost({title: 'Test topic'}).subscribe((r) => {
      console.log(r);
    })
  }
}
