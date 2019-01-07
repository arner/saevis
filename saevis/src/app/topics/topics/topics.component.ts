import { Component, OnInit } from '@angular/core';
import {Topic} from '../../api/model/topic';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

// TODO barrels
import * as topicsSelectors from '../store/topics.selectors';
import * as topicsActions from '../store/topics.actions';
import * as fromTopics from '../store/topics.reducer';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  public topics: Observable<Topic[]>;

  constructor(
    private store: Store<fromTopics.State>
  ) {
    this.topics = this.store.pipe(select(topicsSelectors.getAllTopics));
  }

  public create() {
    this.store.dispatch(new topicsActions.CreateTopic({title: 'Test topic'}));
  }
}
