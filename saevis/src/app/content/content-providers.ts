import {ContentProvider} from './content-provider';
import {EventPreviewComponent} from './event/event-preview/event-preview.component';
import {Content} from '../api/model/content';
import {DiscussionPreviewComponent} from './discussion/discussion-preview/discussion-preview.component';
import {EventComponent} from './event/event/event.component';
import {DiscussionComponent} from './discussion/discussion/discussion.component';
import {EventNewComponent} from './event/event-new/event-new.component';

export const contentProviders: ContentProvider[] = [
  new ContentProvider({
    type: Content.TypeEnum.POLL,
    key: 'poll',
    icon: 'bars',
    title: 'Poll',
    description: 'Vote on specific questions',
    components: {
      preview: null,
      content: null,
      create: null
    }
  }),
  new ContentProvider({
    type: Content.TypeEnum.DISCUSSION,
    key: 'discussion',
    icon: 'message',
    title: 'Discussion',
    description: 'Chat with your friends',
    components: {
      preview: DiscussionPreviewComponent,
      content: DiscussionComponent,
      create: null
    }
  }),
  new ContentProvider({
    type: Content.TypeEnum.EVENT,
    key: 'event',
    icon: 'calendar',
    title: 'Event',
    description: 'A calendar event',
    components: {
      preview: EventPreviewComponent,
      content: EventComponent,
      create: EventNewComponent
    }
  })
];
