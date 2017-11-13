import {Event, Member, EventInterface} from '../../sdk';
import {ActionButton} from '../../action-button';
import {BlockContentInterface} from '../../block-content-interface';

export class EventExtended extends Event implements BlockContentInterface {

  public constructor(data: EventInterface) {
    super(data);
    this.participants = this.participants || [];
    if (this.startTime) {
      this.startTime = new Date(Date.parse(this.startTime.toString()));
    }
    if (this.endTime) {
      this.endTime = new Date(Date.parse(this.endTime.toString()));
    }
  }

  public getNormalActions(userId: number): ActionButton[] {
    return [];
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

  public getHasDone(userId: number): boolean {
    return !!this.participants.find((p: Member) => p.id === userId);
  };

  public getShortText(userId: number): string {
    return this.startTime.getDate() + ' - ' + this.startTime.getMonth() + ' - ' + this.startTime.getFullYear();
  }
}
