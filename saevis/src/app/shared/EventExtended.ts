import {Event, Member, EventInterface} from './sdk';
import {BlockProperties, BlockTextOptions} from './BlockProperties';

export class EventExtended extends Event implements BlockProperties {
  public constructor(data?: EventInterface) {
    super(data);
    this.participants = this.participants || [];
    if (this.startTime) {
      this.startTime = new Date(Date.parse(this.startTime.toString()));
    }
    if (this.endTime) {
      this.endTime = new Date(Date.parse(this.endTime.toString()));
    }
  }

  public get icon(): string {
    return 'event';
  };

  public get canEdit(): boolean {
    return true;
  }
  public get canDelete(): boolean {
    return false;
  }

  public get value(): number {
    return this.participants.length;
  }

  public hasDone(options: BlockTextOptions): boolean {
    return !!this.participants.find((p: Member) => p.id === options.userId);
  };

  public getText(options: BlockTextOptions): string {
    return this.startTime.getDate() + ' - ' + this.startTime.getMonth() + ' - ' + this.startTime.getFullYear();
  }
}
