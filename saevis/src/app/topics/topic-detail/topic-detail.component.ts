import { Component, OnInit } from '@angular/core';
import {Content} from '../../api/model/content';
import {Topic} from '../../api/model/topic';
import {TopicService} from '../../api/api/topic.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;
  public mode: TopicMode;
  private previousState: Topic;

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService
  ) { }

  public get addingContent() {
    return this.topic.content && this.topic.content.some((content: any) => !content.id);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.mode = +this.route.snapshot.queryParams['mode'] || TopicMode.NORMAL;

    this.topicService.topicsIdGet(id).subscribe((topic: Topic) => {
      this.topic = topic;
    });
  }

  public get isInEditMode(): boolean {
    return this.mode === TopicMode.EDIT;
  }

  public get isInNormalMode(): boolean {
    return this.mode === TopicMode.NORMAL;
  }

  public createContent(type: string): void {
    this.topic.content.push({});
  }

  public save(): void {
    this.topicService.topicsIdPut(this.topic, this.topic.id).subscribe((topic: Topic) => {
      this.topic.updatedAt = topic.updatedAt;
      this.mode = TopicMode.NORMAL;
    }, (err: Error) => {
      console.warn(err.message);
    });
  }

  public publish(): void {
    // this.topic.published = true; return;
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

  public cancelContent(index: number) {
    this.topic.content.splice(index, 1);
  }
}

// TODO move to proper place, merge with BlockMode
export enum TopicMode {
  EDIT = 1,
  NORMAL = 2
}
