import {Component, Input, OnInit} from '@angular/core';
import {Event, EventApi} from '../../shared/sdk';
import {BlockMode} from "../../shared/BlockExtended";

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
    this.event = event;
  }
  public event: Event;
  public minDate: Date;

  @Input()
  private mode: BlockMode;
  private blockMode = BlockMode;

  constructor(private eventApi: EventApi) { }

  ngOnInit() {
    this.minDate = new Date();
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
