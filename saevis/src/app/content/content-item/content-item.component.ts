import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Content} from '../../api/model/content';
import {ContentDirective} from './content.directive';
import {ContentService} from '../content.service';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.html',
  styleUrls: ['./content-item.component.scss']
})
export class ContentItemComponent implements OnInit {
  @Input()
  public content: Content;

  @ViewChild(ContentDirective)
  private contentHost: ContentDirective;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.loadContentComponent(this.content, this.contentHost.viewContainerRef);
  }
}
