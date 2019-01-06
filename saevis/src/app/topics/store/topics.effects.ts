import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {from, Observable, of} from 'rxjs';
import {TopicService} from '../../api/api/topic.service';
import {catchError, map, switchMap} from 'rxjs/internal/operators';
import {Topic} from '../../api/model/topic';
import {StoreManyContentTypes} from '../../content/store/content.actions';
import {Content} from '../../api/model/content';
import * as topicsActions from './topics.actions';
import * as contentActions from '../../content/store/content.actions';

@Injectable()
export class TopicsEffects {
  constructor(private api: TopicService, private actions: Actions) {}

  private normalizeContent(topic: Topic): StoreManyContentTypes {
    const contents: Content[] = topic.content.concat();
    // topic.content = topic.content.map(c => c.id) as any;
    delete topic.content;

    return new contentActions.StoreManyContentTypes(contents);
 }

  @Effect()
  fetchTopics: Observable<Action> = this.actions.pipe(
    ofType(topicsActions.ActionTypes.FetchTopics),
    switchMap(() =>
      this.api.topicsGet().pipe(
        switchMap(topics => {
          const actions: Action[] = topics.map(topic => this.normalizeContent(topic));

          actions.push(new topicsActions.FetchTopicsSuccess(topics));

          return actions;
        })
      )
    )
  );

  @Effect()
  fetchTopic: Observable<Action> = this.actions.pipe(
    ofType(topicsActions.ActionTypes.FetchTopic),
    map((action: topicsActions.FetchTopic) => action.id),
    switchMap((id) =>
      this.api.topicsIdGet(id).pipe(
        switchMap(topic => {
          return [this.normalizeContent(topic), new topicsActions.FetchTopicSuccess(topic)];
        }),
        // catchError((error => of(new TopicsActions.SelectTopicFailed(error)))),
      )
    )
  );

  @Effect()
  createTopic: Observable<Action> = this.actions.pipe(
    ofType(topicsActions.ActionTypes.CreateTopic),
    switchMap((action: topicsActions.CreateTopic) => this.api.topicsPost(action.topic).pipe(
        switchMap(topic => [new topicsActions.CreateTopicSuccess(topic)]),
        // catchError((error => of(new TopicsActions.SelectTopicFailed(error)))),
      )
    )
  );
}
