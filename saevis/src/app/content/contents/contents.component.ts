import {Component, Input, OnInit} from '@angular/core';
import {Content} from '../../api/model/content';
import {ContentProvider} from '../content-provider';
import {ContentService} from '../content.service';
import {Topic} from '../../api/model/topic';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {
  @Input()
  public contents: Content[];

  @Input()
  public parentTopic: Topic;

  public contentProviders: ContentProvider[];

  constructor(private contentService: ContentService) {
    this.contentProviders = contentService.getProviders();
  }

  private createNewContentModal(type: Content.TypeEnum): void {
    this.contentService.showNewModal(type, this.parentTopic);
  }

  ngOnInit() {
  }
}
