import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../api/model/event';
import {AuthenticationService} from '../../../auth/authentication.service';
import {ItemComponent} from '../../item-component.interface';
import {Participate, Unparticipate} from '../event.actions';
import * as fromContent from '../../content.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit, ItemComponent {

  @Input()
  public item: Event;

  constructor(private authenticationService: AuthenticationService,
              private store: Store<fromContent.State>) { }

  ngOnInit() {
  }

  public getParticipatingUsers(): string {
    return this.item.participants ?
      this.item.participants.map(p => p.username).join(', ') : '';
  }

  public isParticipating(): boolean {
    return this.authenticationService.currentUser &&
      this.item.participants &&
        this.item.participants.some((user) => user.id === this.authenticationService.currentUserValue.id);
  }

  public participate(): void {
    this.store.dispatch(new Participate(this.item.id));
  }

  public unParticipate(): void {
    this.store.dispatch(new Unparticipate(this.item.id));
  }
}
