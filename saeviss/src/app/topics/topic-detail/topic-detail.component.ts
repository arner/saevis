import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TopicApi, Topic} from '../../shared/sdk';
import {MdDialog} from '@angular/material';
import {TypeSelectorComponent} from '../../blocks/type-selector/type-selector.component';
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
    private dialog: MdDialog
  ) { }

  ngOnInit() {
    this.route.params.map(p => p['id']).subscribe(id => {
      if (!id) return;
      this.topicApi.findById(id, {include: {blocks: 'blockContent'}}).subscribe((topic: Topic) => {
        topic.blocks = topic.blocks.map(b => new BlockExtended(b));
        this.topic = topic;
      });
    });
  }

  createBlock() {
    let dialogRef = this.dialog.open(TypeSelectorComponent, {
      hasBackdrop: false,
    });
    dialogRef.afterClosed().subscribe(type => {
      console.log(`Dialog result: ${type}`);
      this.topic.blocks.push(new BlockExtended({blockContentType: type, topicId: this.topic.id}));
    });
  }
}
