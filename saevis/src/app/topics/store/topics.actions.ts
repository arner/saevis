import { Action } from '@ngrx/store';
import {Topic} from '../../api/model/topic';

export enum ActionTypes {

  FetchTopic = '[TopicsAPI] Fetch topic',
  FetchTopicSuccess = '[TopicsAPI] Fetch topic success',
  FetchTopicFailed = '[TopicsAPI] Fetch topic failed',

  FetchTopics = '[TopicsAPI] Fetch topics',
  FetchTopicsSuccess = '[TopicsAPI] Fetch topics success',
  FetchTopicsFailed = '[TopicsAPI] Fetch topics failed',

  CreateTopic = '[TopicsAPI] Create topic',
  CreateTopicSuccess = '[TopicsAPI] Create topic success',
  CreateTopicFailed = '[TopicsAPI] Create topic failed'
  // AddContentRefToTopic = '[Topics] Add content reference'
  // AddNormalizedTopics = '[Topics] Add normalized topics'
}

export class FetchTopics implements Action {
  public readonly type = ActionTypes.FetchTopics;
}

export class FetchTopicsSuccess implements Action {
  public readonly type = ActionTypes.FetchTopicsSuccess;

  constructor(public readonly topics: Topic[]) {}
}

export class FetchTopicsFailed implements Action {
  public readonly type = ActionTypes.FetchTopicsFailed;

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

export class FetchTopic implements Action {
  public readonly type = ActionTypes.FetchTopic;

  constructor(public readonly id: number) {}
}

export class FetchTopicSuccess implements Action {
  public readonly type = ActionTypes.FetchTopicSuccess;

  constructor(public readonly topic: Topic) {}
}

export class FetchTopicFailed implements Action {
  public readonly type = ActionTypes.FetchTopicFailed;

  constructor(public readonly error: any) {}
}

export class CreateTopic implements Action {
  public readonly type = ActionTypes.CreateTopic;

  constructor(public readonly topic: Topic) {}
}

export class CreateTopicSuccess implements Action {
  public readonly type = ActionTypes.CreateTopicSuccess;

  constructor(public readonly topic: Topic) {}
}

export class CreateTopicFailed implements Action {
  public readonly type = ActionTypes.CreateTopicFailed;

  constructor(public readonly error: any) {}
}

export type Union = FetchTopics |
  FetchTopic |
  FetchTopicSuccess |
  FetchTopicsSuccess |
  FetchTopicsFailed |
  FetchTopicFailed |
  CreateTopic |
  CreateTopicSuccess |
  CreateTopicFailed;

