import {PollComponent, PollExtended} from './poll';
import {EventComponent, EventExtended} from './event';
import {ContentTypes} from "./content-types-interface";

export type ContentTypeString = 'Poll'|'Event';

export const CONTENT_TYPES: ContentTypes = {
  Poll: {
    entity: PollExtended,
    component: PollComponent,
  },
  Event: {
    entity: EventExtended,
    component: EventComponent,
  },
};
