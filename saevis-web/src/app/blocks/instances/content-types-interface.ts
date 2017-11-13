import {BlockContentConstructor, BlockComponentConstructor} from '../block-factory';
import {BlockComponentInterface} from '../block.component';
import {BlockContentInterface} from '../block-content-interface';

interface BlockClasses {
  entity: BlockContentConstructor<BlockContentInterface>,
  component: BlockComponentConstructor<BlockComponentInterface>
}

export interface ContentTypes {
  [key: string]: BlockClasses;
}
