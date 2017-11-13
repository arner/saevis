import {SDKModels, Poll, PollApi, Event, EventApi, Block, BlockInterface} from './sdk';

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
        console.log(this.blockContent.id);
        if (!this.blockContent.id) {
          this._mode = BlockMode.NEW;
        } else {
          this._mode = BlockMode.NORMAL;
        }
    }

    private _mode: BlockMode;
    public get mode(): BlockMode {
      return this._mode;
    }

    public edit() {
      if (this.canEdit) {
        this._mode = BlockMode.EDIT;
      } else {
        console.error('Can not edit this type.');
      }
    }

    public get icon(): string {
      return this.mapping[this.blockContentType].icon;
    }
    public get canEdit(): string {
      return this.mapping[this.blockContentType].canEdit;
    }
    public get canDelete(): string {
      return this.mapping[this.blockContentType].canDelete;
    }

    private mapping: any = {
      Poll: {
        icon: 'poll',
        clas: Poll,
        api: PollApi,
        canEdit: false,
        canDelete: false
      },
      Event: {
        icon: 'event',
        clas: Event,
        api: EventApi,
        canEdit: true,
        canDelete: false
      }
    };
}

export enum BlockMode {
  NORMAL = 1,
  EDIT = 2,
  NEW = 3,
}
