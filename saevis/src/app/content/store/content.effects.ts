import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {from, Observable, of, pipe} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as contentActions from './content.actions';
import {DefaultService} from '../../api/api/default.service';

@Injectable()
export class ContentEffects {
  constructor(private actions: Actions, private api: DefaultService) {}

  @Effect()
  createContent: Observable<Action> = this.actions.pipe(
    ofType(contentActions.ActionTypes.CreateContent),
    switchMap((action: contentActions.CreateContent) => this.api.contentPost(action.content).pipe(
      switchMap(content => [
        new contentActions.CreateContentSuccess(content)
      ])
    ))
  );


  @Effect()
  storeManyContent: Observable<Action> = this.actions.pipe(
    ofType(contentActions.ActionTypes.StoreManyContentTypes),
    map((action: contentActions.StoreManyContentTypes) => action.contents),
    switchMap((contents) => {
      const actions: Action[] = [];

      // contents.forEach(content => {
      //   switch (content.type) {
      //     case Content.TypeEnum.EVENT: {
      //       actions.push(new eventActions.AddOne(Object.assign({}, content.event)));
      //
      //       delete content.event;
      //     }
      //   }
      // });

      actions.push(new contentActions.AddManyContentItems(contents));

      return actions;
    })
  );
}
