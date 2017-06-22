import { Component, OnInit } from '@angular/core';
import {TopicApi} from '../shared/sdk/services/custom/Topic';
import {Observable} from 'rxjs';
import {Topic} from '../shared/sdk/models/Topic';

@Component({
  selector: 'saevis-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  private topics: Observable<Topic[]>;
  private topic: Topic = new Topic({title: 'New topic ' + new Date().getTime().toString()});

  constructor(private topicApi: TopicApi) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.topics = this.topicApi.find({include: {blocks: 'blockContent'}});
  }

  create() {
    this.topicApi.create(this.topic).subscribe((t) => {
      this.topic = new Topic();
      this.refresh();
    });
  }
}
