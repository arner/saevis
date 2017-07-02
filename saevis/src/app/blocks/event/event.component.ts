import {Component, Input, OnInit} from '@angular/core';
import {Event, EventApi, Member, LoopBackAuth} from '../../shared/sdk';
import {BlockMode} from "../../shared/BlockExtended";
import {EventExtended} from '../../shared/EventExtended';

@Component({
  selector: 'saevis-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input()
  private mode: BlockMode;
  private blockMode = BlockMode;
  public minDate: Date;

  @Input()
  public content: EventExtended;

  public get userId(): number {
    return this.auth.getCurrentUserId();
  };
  public get isParticipating() {
    return this.content.hasDone({userId: this.userId});
  }

  constructor(private eventApi: EventApi, private auth: LoopBackAuth) { }

  ngOnInit() {
    this.minDate = new Date();
  }

  public toggleParticipating() {
    if (this.isParticipating) {
      this.eventApi.unlinkParticipants(this.content.id, this.userId).subscribe(r => {
        this.content.participants = this.content.participants.filter((member: Member) => member.id !== this.userId);
      });
    } else {
      this.eventApi.linkParticipants(this.content.id, this.userId).subscribe(r => {
        this.content.participants.push(this.auth.getCurrentUserData());
      });
    }
  }

  public onChangeStartTime() {
    if (this.content && this.content.startTime && !this.content.endTime) {
      this.content.endTime = this.content.startTime;
    }
  }

  public save() {
    // CREATE
    if (this.mode === BlockMode.NEW) {
      delete this.content.id;
      this.eventApi.create(this.content).subscribe((event: Event) => {
        this.mode = BlockMode.NORMAL;
        this.content = new EventExtended(event);
      }, (err: Error) => {
        console.warn('c', err.message);
      });

    // UPDATE
    } else {
      this.eventApi.updateAttributes(this.content.id, this.content).subscribe((event: Event) => {
        this.mode = BlockMode.NORMAL;
      }, (err: Error) => {
        console.warn('u', err.message);
      });
    }
  }
}
