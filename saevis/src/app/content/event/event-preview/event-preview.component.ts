import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../api/model/event';
import {AuthenticationService} from '../../../auth/authentication.service';
import {EventService} from '../../../api/api/event.service';
import {ItemComponent} from '../../item-component.interface';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit, ItemComponent {

  @Input()
  public item: Event;

  constructor(private authenticationService: AuthenticationService,
              private eventService: EventService) { }

  ngOnInit() {
  }

  public getParticipatingUsers(): string {
    return this.item.participants.map(p => p.username).join(', ');
  }

  public isParticipating(): boolean {
    return this.authenticationService.currentUser &&
      this.item.participants.some((user) => user.id === this.authenticationService.currentUserValue.id);
  }

  public participate(): void {
    this.eventService.eventsIdParticipantsPost(this.item.id).subscribe((res: Event) => {
      this.item.participants = res.participants;
    });
  }

  public unParticipate(): void {
    this.eventService.eventsIdParticipantsDelete(this.item.id).subscribe((res: Event) => {
      this.item.participants = res.participants;
    });
  }
}
