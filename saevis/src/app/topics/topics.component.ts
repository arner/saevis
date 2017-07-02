import { Component, OnInit } from '@angular/core';
import {TopicApi} from '../shared/sdk/services/custom/Topic';
import {Observable} from 'rxjs';
import {Topic} from '../shared/sdk/models/Topic';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicMode} from './topic-detail/topic-detail.component';
import {BlockExtended} from '../shared/BlockExtended';
import {Block} from '../shared/sdk/models/Block';
import {BlockTextOptions} from '../shared/BlockProperties';
import {LoopBackAuth} from '../shared/sdk/services/core/auth.service';

@Component({
  selector: 'saevis-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  private topics: Observable<Topic[]>;
  private options: BlockTextOptions;

  constructor(
    private topicApi: TopicApi,
    private router: Router,
    private route: ActivatedRoute,
    private auth: LoopBackAuth
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.options = {
      userId: this.auth.getCurrentUserId()
    };
    this.topics = this.topicApi.find({include: {blocks: 'blockContent'}}).map((topics: Topic[]): Topic[] => {
      return topics.map((topic: Topic) => {
        topic.blocks = topic.blocks.map((block: Block) => new BlockExtended(block));
        return topic;
      });
    });
  }

  create() {
    this.topicApi.create(new Topic({title: 'New topic', published: false})).subscribe((t) => {
      this.router.navigate([t.id], {relativeTo: this.route, queryParams: {mode: TopicMode.EDIT}});
    });
  }
}
