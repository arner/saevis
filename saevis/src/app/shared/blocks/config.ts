import {PollComponent, PollExtended, EventComponent, EventExtended} from './instances';
import {BlockContentConstructor, BlockComponentConstructor} from './block-factory';
import {BlockComponentInterface} from './block.component';
import {BlockContentInterface} from './block-content-interface';

interface BlockClasses {
  entity: BlockContentConstructor<BlockContentInterface>,
  component: BlockComponentConstructor<BlockComponentInterface>
}

interface ContentTypes {
  [key: string]: BlockClasses;
}

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
