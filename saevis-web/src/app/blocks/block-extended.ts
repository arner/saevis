import {Block, BlockInterface} from './sdk';
import {BlockContentInterface} from './block-content-interface';

export class BlockExtended<T> extends Block {
  public mode: BlockMode = BlockMode.NORMAL;
  public blockContent: BlockContentInterface & T;

  public constructor(data: BlockInterface, type?: T) {
    super(data);
    this.validate(data);
    if (!this.id) {
      this.mode = BlockMode.NEW;
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

  public edit() {
    if (this.blockContent.canEdit) {
      this.mode = BlockMode.EDIT;
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
