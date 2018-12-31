import { Component, OnInit } from '@angular/core';
import {Topic} from '../../api/model/topic';
import {TopicService} from '../../api/api/topic.service';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../../content/content.service';
import {ContentProvider} from '../../content/content-provider';
import {Content} from '../../api/model/content';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  public topic: Topic;
  public contentProviders: ContentProvider[];

  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private contentService: ContentService
  ) {
    this.contentProviders = contentService.getProviders();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.topicService.topicsIdGet(id).subscribe((topic: Topic) => {
      this.topic = topic;
    });
  }

  private createNewContentModal(type: Content.TypeEnum): void {
    this.contentService.showNewModal(type, this.topic);
  }

  public save(): void {
    this.topicService.topicsIdPut(this.topic, this.topic.id).subscribe((topic: Topic) => {
      this.topic.updatedAt = topic.updatedAt;
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
}
