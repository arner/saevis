import {Poll, Event, Block, BlockInterface} from './sdk';
import {EventExtended} from './EventExtended';
import {PollExtended} from './PollExtended';

export class BlockExtended extends Block {

  public constructor(data?: BlockInterface) {
    super(data);
    this.validate(data);

    // Set default
    data.blockContent = data.blockContent || {};
    if (!data.blockContent.topicId) {
      data.blockContent.topicId = data.topicId;
    }

    // Create the methods
    switch (this.blockContentType) {
      case 'Poll':
        this.blockContent = new PollExtended(data.blockContent);
        break;
      case 'Event':
        this.blockContent = new EventExtended(data.blockContent);
        break;
    }

    // Set mode
    if (!this.blockContent.id) {
      this._mode = BlockMode.NEW;
    } else {
      this._mode = BlockMode.NORMAL;
    }
  }

  private validate(data: BlockInterface) {
    if (!data.blockContentType) {
      throw 'Specify the type.';
    }
    if (!data.topicId) {
      throw 'Specify a topic';
    }
  }

  private _mode: BlockMode;
  public get mode(): BlockMode {
    return this._mode;
  }

  public edit() {
    if (this.blockContent.canEdit) {
      this._mode = BlockMode.EDIT;
    } else {
      console.error('Can not edit this type.');
    }
  }
}

export enum BlockMode {
  NORMAL = 1,
  EDIT = 2,
  NEW = 3,
}
