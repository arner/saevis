import {Component, Input, OnInit} from '@angular/core';
import {Event, EventApi} from '../../shared/sdk';

@Component({
  selector: 'saevis-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input()
  public set content(event: Event) {
    this.event = event;
  }
  public event: Event;
  public minDate: Date;

  public editClicked: boolean = false;

  public get isNew(): boolean {
    return this.event && !this.event.id;
  }

  public get editing(): boolean {
    return this.isNew || this.editClicked;
  }

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
    delete this.event.id;
    this.eventApi.create(this.event).subscribe(event => console.log(event), err => console.warn(err.message));
  }
}
