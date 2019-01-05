import { Action } from '@ngrx/store';
import {Comment} from '../../api/model/comment';

export enum ActionTypes {
  CreateComment = '[Discussion] Create comment',
  CreateCommentSuccess = '[Discussion] Create comment success'
}

export class CreateComment implements Action {
  public readonly type = ActionTypes.CreateComment;

  constructor(public readonly discussionId: number,
              public readonly text: string,
              public readonly contentId: number) {}
}

export class CreateCommentSuccess implements Action {
  public readonly type = ActionTypes.CreateCommentSuccess;

  constructor(public readonly comment: Comment,
              public readonly contentId: number) {}
}

export type Union = CreateComment | CreateCommentSuccess;
