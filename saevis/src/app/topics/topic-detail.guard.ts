import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {switchMap, catchError, tap, filter, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromTopics from './store/topics.reducer';
import * as topicsSelectors from './store/topics.selectors';
import {FetchTopic} from './store/topics.actions';

@Injectable()
export class TopicDetailGuard implements CanActivate {
  constructor(private store: Store<fromTopics.State>) {}


  getFromStoreOrAPI(): Observable<any> {
    return combineLatest(
      this.store.select(topicsSelectors.selectedTopicExists),
      this.store.select(topicsSelectors.getSelectedTopicId)
    ).pipe(
        tap(([exists, id]) => {
          if (!exists) {
            this.store.dispatch(new FetchTopic(id));
          }
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
