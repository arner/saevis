import {Poll, Vote, PollInterface} from './sdk';
import {BlockProperties, BlockTextOptions} from './BlockProperties';

export class PollExtended extends Poll implements BlockProperties {
  public constructor(data?: PollInterface) {
    super(data);
    this.settings = this.settings || {};
    if (!this.id && !this.options || !this.options.length) {
      this.options = [{text: ''}, {text: ''}];
    }
  }

  public get icon(): string {
    return 'poll';
  };

  public get canEdit(): boolean {
    return false;
  }
  public get canDelete(): boolean {
    return false;
  }

  public get value(): number {
    return this.votes.length;
  }

  public hasDone(options: BlockTextOptions): boolean {
    return !!this.votes.find((p: Vote) => p.voterId === options.userId);
  };

  public getText(options: BlockTextOptions): string {
    return this.hasDone(options) ? 'Gestemd' : 'Niet gestemd';
  }
}
