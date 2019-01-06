import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of} from 'rxjs';
import {switchMap, catchError, tap, filter, take} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import * as fromTopics from './store/topics.reducer';
import * as topicsSelectors from './store/topics.selectors';
import * as topicsActions from './store/topics.actions';

@Injectable()
export class TopicsGuard implements CanActivate {
  constructor(private store: Store<fromTopics.State>) {}

  protected selector: any = topicsSelectors.getAllTopics;
  protected fetchAction: Action = new topicsActions.FetchTopics();

  getFromStoreOrAPI(): Observable<any> {
    return this.store.select(this.selector).pipe(
        tap((items) => {
          // TODO: need better rules. Length == 1 if we refreshed on a details page
          //if (!items || (Array.isArray(items) && !items.length)) {
            this.store.dispatch(this.fetchAction);
          //}
        }),
        filter((items) => !!items),
        take(1)
      );
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
