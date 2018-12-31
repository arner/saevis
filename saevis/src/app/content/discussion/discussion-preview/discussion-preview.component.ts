import {Component, Input, OnInit} from '@angular/core';
import {Discussion} from '../../../api/model/discussion';
import {Comment} from '../../../api/model/comment';
import {ItemComponent} from '../../item-component.interface';

@Component({
  selector: 'app-discussion-preview',
  templateUrl: './discussion-preview.component.html',
  styleUrls: ['./discussion-preview.component.scss']
})
export class DiscussionPreviewComponent implements OnInit, ItemComponent {
  @Input()
  public item: Discussion;

  constructor() { }

  ngOnInit() {
  }

  public getLastComment(): Comment | void {
    if (!this.item.comments || !this.item.comments.length) {
      return;
    }

    return this.item.comments[this.item.comments.length -1];
  }
}
