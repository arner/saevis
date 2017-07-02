import {Component, Input, OnInit} from '@angular/core';
import {Event, EventApi} from '../../shared/sdk';
import {BlockMode} from "../../shared/BlockExtended";
import {MemberApi} from '../../shared/sdk/services/custom/Member';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {Member} from '../../shared/sdk/models/Member';

@Component({
  selector: 'saevis-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input()
  public set content(event: Event) {
    if (event.startTime) {
      event.startTime = new Date(Date.parse(event.startTime.toString()));
    }
    if (event.endTime) {
      event.endTime = new Date(Date.parse(event.endTime.toString()));
    }
    console.log(event);

    this.event = event;
  }
  public event: Event;
  public minDate: Date;

  @Input()
  private mode: BlockMode;
  private blockMode = BlockMode;

  public get isParticipating() {
    return !!this.event.participants.find((member: Member) => member.id === this.auth.getCurrentUserId());
  }

  constructor(private eventApi: EventApi, private auth: LoopBackAuth) { }

  ngOnInit() {
    this.minDate = new Date();
  }

  public toggleParticipating() {
    const currentMemberId = this.auth.getCurrentUserId();
    if (this.isParticipating) {
      this.eventApi.unlinkParticipants(this.event.id, currentMemberId).subscribe(r => {
        this.event.participants = this.event.participants.filter((member: Member) => member.id !== currentMemberId);
      });
    } else {
      this.eventApi.linkParticipants(this.event.id, currentMemberId).subscribe(r => {
        this.event.participants.push(this.auth.getCurrentUserData());
      });
    }
  }

  public onChangeStartTime() {
    if (this.event && this.event.startTime && !this.event.endTime) {
      this.event.endTime = this.event.startTime;
    }
  }

  public save() {
    // delete this.event.id;
    console.log(this.mode);
    if (this.mode === BlockMode.NEW) {
      delete this.event.id;
      this.eventApi.create(this.event).subscribe((event: Event) => {
        this.mode = BlockMode.NORMAL;
      }, (err: Error) => {
        console.warn('c', err.message);
      });
    } else {
      this.eventApi.updateAttributes(this.event.id, this.event).subscribe((event: Event) => {
        this.mode = BlockMode.NORMAL;
      }, (err: Error) => {
        console.warn('u', err.message);
      });
    }
  }
}
