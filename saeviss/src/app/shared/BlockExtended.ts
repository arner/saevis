import {Block, BlockInterface} from './sdk/models';
import {SDKModels} from './sdk/services/custom/SDKModels';

export class BlockExtended extends Block {

    public constructor(data?: BlockInterface) {
        super(data);

        if (!data.blockContentType) {
          throw 'Specify the type.';
        }
        if (!data.topicId) {
          throw 'Specify a topic';
        }
        const type = new SDKModels().get(data.blockContentType);

        data.blockContent = data.blockContent || {};
        if (!data.blockContent.topicId) {
          data.blockContent.topicId = data.topicId;
        }
        this.blockContent = new type(data.blockContent);
    }

    // public toJSON(): BlockInterface {
    //   return {
    //
    //   }
    // }

}
