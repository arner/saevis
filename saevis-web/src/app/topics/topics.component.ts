import { Component, OnInit } from '@angular/core';
import {TopicApi} from '../shared/sdk/services/custom/Topic';
import {Observable} from 'rxjs';
import {Topic} from '../shared/sdk/models/Topic';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicMode} from './topic-detail/topic-detail.component';
import {BlockExtended} from '../shared/BlockExtended';
import {Block} from '../shared/sdk/models/Block';

@Component({
  selector: 'saevis-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  private topics: Observable<Topic[]>;

  constructor(private topicApi: TopicApi, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.topics = this.topicApi.find({include: {blocks: 'blockContent'}}).map((topics: Topic[]): Topic[] => {
      return topics.map((topic: Topic) => {
        topic.blocks = topic.blocks.map((block: Block) => new BlockExtended(block));
        return topic;
      });
    });
  }

  create() {
    this.topicApi.create(new Topic({title: 'New topic'})).subscribe((t) => {
      this.router.navigate([t.id], {relativeTo: this.route, queryParams: {mode: TopicMode.EDIT}});
    });
  }
}
