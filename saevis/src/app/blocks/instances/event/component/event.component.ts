import {Component} from '@angular/core';
import {BlockComponent} from '../../../block.component';
import {ActionButton} from '../../../action-button';
import {Member, LoopBackAuth, EventApi} from '../../../sdk';
import {EventExtended} from '../event-extended';

@Component({
  selector: 'saevis-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent extends BlockComponent<EventExtended> {
  public minDate: Date;
  public normalActions: ActionButton[] = [];

  constructor(protected api: EventApi, auth: LoopBackAuth) {
    super(EventExtended, auth);
  }

  ngOnInit() {
    this.minDate = new Date();
    super.ngOnInit();
  }

  public get isParticipating(): boolean {
    return this.content.getHasDone(this.userId);
  }

  public toggleParticipating() {
    if (this.isParticipating) {
      this.unparticipate();
    } else {
      this.participate();
    }
  }

  private participate() {
    this.api.linkParticipants(this.content.id, this.userId).subscribe(r => {
      this.content.participants.push(this.auth.getCurrentUserData());
    });
  }

  private unparticipate() {
    this.api.unlinkParticipants(this.content.id, this.userId).subscribe(r => {
      this.content.participants = this.content.participants.filter((member: Member) => member.id !== this.userId);
    });
  }

  public onChangeStartTime() {
    if (this.content && this.content.startTime && !this.content.endTime) {
      this.content.endTime = this.content.startTime;
    }
  }
}
