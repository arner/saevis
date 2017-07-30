import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TopicApi, Topic, Block} from '../../shared/sdk';
import {BlockExtended, BlockFactory, ContentTypeString} from '../../shared/blocks';

@Component({
  selector: 'saevis-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;
  public mode: TopicMode;
  public topicMode = TopicMode;
  private previousState: Topic;

  constructor(
    private route: ActivatedRoute,
    private topicApi: TopicApi
  ) { }

  public get addingBlock() {
    return !!this.topic.blocks.find((block: BlockExtended<any>) => !block.id);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.mode = +this.route.snapshot.queryParams['mode'] || TopicMode.NORMAL;

    this.topicApi.findById(id, {include: {blocks: 'blockContent'}}).subscribe((topic: Topic) => {
      topic.blocks = topic.blocks.map((block: Block) => BlockFactory.fromBlock(block));
      this.topic = topic;
    });
  }

  public createBlock(type: ContentTypeString): void {
      this.topic.blocks.push(BlockFactory.createNew(type, this.topic.id));
  }

  public save(): void {
    this.topicApi.updateAttributes(this.topic.id, this.topic).subscribe((topic: Topic) => {
      console.log('Saved topic.', topic);
      this.mode = TopicMode.NORMAL;
    }, (err: Error) => {
      console.warn(err.message);
    });
  }

  public publish(): void {
    this.topic.published = true; return;
    // this.topicApi.updateAttributes(this.topic.id, this.topic).subscribe((topic: Topic) => {
    //   console.log('Saved topic.', topic);
    //   // this.mode = TopicMode.NORMAL;
    // }, (err: Error) => {
    //   console.warn(err.message);
    // });
  }

  public edit(): void {
    this.mode = TopicMode.EDIT;
    this.previousState = Object.assign({}, this.topic);
  }

  public cancel(): void {
    if (this.previousState) {
      this.topic = Object.assign({}, this.previousState);
    }
    this.mode = TopicMode.NORMAL;
  }

  public cancelBlock(index: number) {
    this.topic.blocks.splice(index, 1);
  }
}

// TODO move to proper place, merge with BlockMode
export enum TopicMode {
  EDIT = 1,
  NORMAL = 2
}
