import {Poll, Vote, PollInterface} from '../../../sdk';
import {BlockContentInterface} from '../../block-content-interface';

export class PollExtended extends Poll implements BlockContentInterface {

  public constructor(data: PollInterface) {
    super(data);
    this.settings = this.settings || {};
    if (!this.id && !this.options || !this.options.length) {
      this.options = [{text: ''}, {text: ''}];
    }
    if (!this.votes) {
      this.votes = [];
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

  public getHasDone(userId: number): boolean {
    return !!this.votes.find((p: Vote) => p.voterId === userId);
  };

  public getShortText(userId: number): string {
    return this.getHasDone(userId) ? 'Gestemd' : 'Niet gestemd';
  }
}
