import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TopicApi, Topic} from '../../shared/sdk';
import {BlockExtended} from "../../shared/BlockExtended";

@Component({
  selector: 'saevis-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;

  constructor(
    private route: ActivatedRoute,
    private topicApi: TopicApi,
  ) { }

  public get addingBlock() {
    return !!this.topic.blocks.find((block: BlockExtended) => !block.id);
  }

  ngOnInit() {
    this.route.params.map(p => p['id']).subscribe(id => {
      if (!id) return;
      this.topicApi.findById(id, {include: {blocks: 'blockContent'}}).subscribe((topic: Topic) => {
        topic.blocks = topic.blocks.map(b => new BlockExtended(b));
        this.topic = topic;
      });
    });
  }

  public createBlock(type: string) {
      this.topic.blocks.push(new BlockExtended({blockContentType: type, topicId: this.topic.id}));
  }
}
