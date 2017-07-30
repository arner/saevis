import {BlockExtended, BlockContentInterface} from '.';
import {BlockComponentInterface} from './block.component';
import {CONTENT_TYPES, ContentTypeString} from './config';
import {Block} from '../sdk';

export type BlockContentConstructor<T extends BlockContentInterface> = {new (data?: any): T;}
export type BlockComponentConstructor<T extends BlockComponentInterface> = {new (...args: any[]): T;}

export class BlockFactory {

  public static getEntity(type: ContentTypeString): BlockContentConstructor<BlockContentInterface> {
    return CONTENT_TYPES[type].entity;
  }

  public static getComponent(type: ContentTypeString): BlockComponentConstructor<BlockComponentInterface> {
    return CONTENT_TYPES[type].component;
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
