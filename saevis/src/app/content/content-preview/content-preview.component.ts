import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Content} from '../../api/model/content';
import {ContentPreviewDirective} from './content-preview.directive';
import {ContentService} from '../content.service';


@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss']
})
export class ContentPreviewComponent implements OnInit {
  @Input()
  public isLast: boolean;

  @Input()
  public content: Content;

  @ViewChild(ContentPreviewDirective)
  private contentPreviewHost: ContentPreviewDirective;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.loadPreviewComponent(this.content, this.contentPreviewHost.viewContainerRef);
  }
}
