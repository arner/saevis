import { Component, OnInit } from '@angular/core';
import {Topic, TopicApi, Block, LoopBackAuth} from '../shared/sdk';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TopicMode} from './topic-detail/topic-detail.component';
import {BlockFactory} from '../shared/blocks';

@Component({
  selector: 'saevis-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  private topics: Observable<Topic[]>;
  private userId: number;

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
    this.userId = this.auth.getCurrentUserId();
    this.topics = this.topicApi.find({include: {blocks: 'blockContent'}}).map((topics: Topic[]): Topic[] => {
      return topics.map((topic: Topic) => {
        topic.blocks = topic.blocks.map((block: Block) => BlockFactory.fromBlock(block));
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
