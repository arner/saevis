import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {from, Observable, of} from 'rxjs';
import {TopicService} from '../api/api/topic.service';
import {catchError, map, switchMap} from 'rxjs/internal/operators';
import {Topic} from '../api/model/topic';
import {StoreManyContentTypes} from '../content/content.actions';
import {Content} from '../api/model/content';
import * as topicsActions from './topics.actions';
import * as contentActions from '../content/content.actions';

@Injectable()
export class TopicsEffects {
  constructor(private api: TopicService, private actions: Actions) {}

  private normalizeContent(topic: Topic): StoreManyContentTypes {
    const contents: Content[] = topic.content.concat();
    topic.content = topic.content.map(c => c.id) as any;

    return new contentActions.StoreManyContentTypes(contents);
 }

  @Effect()
  getTopics: Observable<Action> = this.actions.pipe(
    ofType(topicsActions.ActionTypes.GetTopics),
    switchMap(() =>
      this.api.topicsGet().pipe(
        switchMap(topics => {
          const actions: Action[] = topics.map(topic => this.normalizeContent(topic));

          actions.push(new topicsActions.GetTopicsSuccess(topics));

          return actions;
        })
      )
    )
  );

  @Effect()
  selectTopic: Observable<Action> = this.actions.pipe(
    ofType(topicsActions.ActionTypes.SelectTopic),
    map((action: topicsActions.SelectTopic) => action.id),
    switchMap((id) =>
      this.api.topicsIdGet(id).pipe(
        switchMap(topic => {
          return [this.normalizeContent(topic), new topicsActions.SelectTopicSuccess(topic)];
        }),
        // catchError((error => of(new TopicsActions.SelectTopicFailed(error)))),
      )
    )
  );
}
