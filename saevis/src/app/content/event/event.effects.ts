import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/internal/operators';
import {EventService} from '../../api/api/event.service';
import * as EventActions from './event.actions';

@Injectable()
export class EventEffects {
  constructor(private api: EventService, private actions: Actions) {}

  @Effect()
  participate: Observable<Action> = this.actions.pipe(
    ofType(EventActions.ActionTypes.Participate),
    map((action: EventActions.Participate) => action.id),
    switchMap((id) => this.api.eventsIdParticipantsPost(id).pipe(
        map(event => new EventActions.ParticipateSuccess(event)),
        //catchError((error => of(new TopicsActions.GetTopicsFailed(error)))),
      )
    )
  );

  @Effect()
  unparticipate: Observable<Action> = this.actions.pipe(
    ofType(EventActions.ActionTypes.Unparticipate),
    map((action: EventActions.Participate) => action.id),
    switchMap((id) => this.api.eventsIdParticipantsDelete(id).pipe(
        map(event => new EventActions.UnparticipateSuccess(event)),
        //catchError((error => of(new TopicsActions.GetTopicsFailed(error)))),
      )
    )
  );
}
