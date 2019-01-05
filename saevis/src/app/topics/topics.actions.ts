import { Action } from '@ngrx/store';
import {Topic} from '../api/model/topic';

export enum ActionTypes {
  GetTopics = '[Topics] Get',
  SelectTopic = '[Topics] Select topic',
  SelectTopicSuccess = '[Topics] Select topic ok',
  SelectTopicFailed = '[Topics] Select topic failed',
  GetTopicsSuccess = '[Topics] Get topics ok',
  GetTopicsFailed = '[Topics] Get topics failed',
  // AddContentRefToTopic = '[Topics] Add content reference'
  // AddNormalizedTopics = '[Topics] Add normalized topics'
}

export class GetTopics implements Action {
  public readonly type = ActionTypes.GetTopics;
}

export class GetTopicsSuccess implements Action {
  public readonly type = ActionTypes.GetTopicsSuccess;

  constructor(public readonly topics: Topic[]) {}
}

export class GetTopicsFailed implements Action {
  public readonly type = ActionTypes.GetTopicsFailed;

  constructor(public readonly error: any) {}
}

// export class AddContentRefToTopic implements Action {
//   public readonly type = ActionTypes.AddContentRefToTopic;
//
//   constructor(public readonly topicId: number, public readonly contentId: number) {}
// }

// export class AddNormalizedTopics implements Action {
//   public readonly type = ActionTypes.AddNormalizedTopics;
//
//   constructor(public readonly normalizedTopic: {topicId: number, id: number});
// }

export class SelectTopic implements Action {
  public readonly type = ActionTypes.SelectTopic;

  constructor(public readonly id: number) {}
}

export class SelectTopicSuccess implements Action {
  public readonly type = ActionTypes.SelectTopicSuccess;

  constructor(public readonly topic: Topic) {}
}

export class SelectTopicFailed implements Action {
  public readonly type = ActionTypes.SelectTopicFailed;

  constructor(public readonly error: any) {}
}

export type Union = GetTopics |
  SelectTopic |
  SelectTopicSuccess |
  GetTopicsSuccess |
  GetTopicsFailed |
  SelectTopicFailed;

