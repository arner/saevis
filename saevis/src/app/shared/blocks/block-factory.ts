import {PollExtended, EventExtended, PollComponent, EventComponent} from './instances';
import {BlockExtended, BlockContentInterface, BlockTextOptions, BlockComponentInterface} from '.';
import {Block} from '../sdk';

export type BlockContentConstructor<T extends BlockContentInterface> = {new (data?: any, options?: BlockTextOptions): T;}
export type BlockComponentConstructor<T extends BlockComponentInterface> = {new (...args: any[]): T;}
export type ContentTypeString = 'Poll'|'Event';

interface BlockClasses {
  entity: BlockContentConstructor<BlockContentInterface>,
  component: BlockComponentConstructor<BlockComponentInterface>
}

interface ContentTypes {
  [key: string]: BlockClasses;
}

export class BlockFactory {
  private static contentTypes: ContentTypes = {
    Poll: {
      entity: PollExtended,
      component: PollComponent,
    },
    Event: {
      entity: EventExtended,
      component: EventComponent,
    },
  };

  public static getEntity(type: ContentTypeString): BlockContentConstructor<BlockContentInterface> {
    return this.contentTypes[type].entity;
  }

  public static getComponent(type: ContentTypeString): BlockComponentConstructor<BlockComponentInterface> {
    return this.contentTypes[type].component;
  }

  public static createNew(blockContentType: ContentTypeString, topicId: number): BlockExtended<any> {
    const newBlock: Block = Block.factory({
      blockContentType,
      topicId,
      blockContent: {
        topicId
      },
    });
    return this.fromBlock(newBlock);
  }

  public static createContent<T extends BlockContentInterface>(type: BlockContentConstructor<T>, data: any): T {
    return new type(data);
  }

  public static fromBlock(block: Block): BlockExtended<any> {
    const type = BlockFactory.getEntity(<ContentTypeString>block.blockContentType);
    block.blockContent = this.createContent(type, block.blockContent);

    return new BlockExtended(block, type);
  }
}
