import {Content} from '../api/model/content';
import {ContentType} from './content-type.enum';

export class ContentMetadata {
  public readonly icon: string;
  public readonly title: string;
  public readonly content: any;

  public constructor(content: Content) {
    switch (content.type) {
      case ContentType.POLL:
        this.icon = 'poll';
        this.title = 'Poll';
        this.content = content.poll;
        break;
      case ContentType.DISCUSSION:
        this.icon = 'chat';
        this.title = 'Discussion';
        this.content = content.discussion;
        break;
      case ContentType.EVENT:
        this.icon = 'calendar_today';
        this.title = 'Event';
        this.content = content.event;
    }
  }
}
