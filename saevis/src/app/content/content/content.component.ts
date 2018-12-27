import {Component, Input, OnInit} from '@angular/core';
import {Content} from '../../api/model/content';
import {ContentMetadata} from '../content-metadata';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input()
  public content: Content;

  constructor() { }

  public get contentMetadata(): ContentMetadata {
    return new ContentMetadata(this.content);
  }

  ngOnInit() {
  }
}
