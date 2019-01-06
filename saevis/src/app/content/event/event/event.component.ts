import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../auth/authentication.service';
import {Event} from '../../../api/model/event';
import {ItemComponent} from '../../item-component.interface';
import * as fromContent from '../../store/content.reducer';
import {Store} from '@ngrx/store';
import {Participate, Unparticipate} from '../event.actions';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, ItemComponent {
  @Input()
  public item: Event;

  constructor(private authenticationService: AuthenticationService,
              private store: Store<fromContent.State>) { }

  ngOnInit() {
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
