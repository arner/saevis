import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/internal/operators';
import * as discussionActions from './discussion.actions';
import {DiscussionService} from '../../api/api/discussion.service';

@Injectable()
export class DiscussionEffects {
  constructor(private api: DiscussionService, private actions: Actions) {}

  @Effect()
  createComment: Observable<Action> = this.actions.pipe(
    ofType(discussionActions.ActionTypes.CreateComment),
    switchMap((action: discussionActions.CreateComment) => this.api.discussionIdCommentsPost({
        text: action.text
      }, action.discussionId).pipe(
        map(comment => new discussionActions.CreateCommentSuccess(comment, action.contentId)),
        //catchError((error => of(new TopicsActions.GetTopicsFailed(error)))),
      )
    )
  );
}
