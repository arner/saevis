import * as topicsActions from './topics.actions';
import {Topic} from '../../api/model/topic';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';

export const adapter: EntityAdapter<Topic> = createEntityAdapter<Topic>();

export interface State extends EntityState<Topic> {
}

export const initialState: State = adapter.getInitialState({
});

export function reducer(state = initialState, action: topicsActions.Union): State {
  switch (action.type) {
    case topicsActions.ActionTypes.FetchTopicsSuccess: {
      return adapter.addMany(action.topics, state);
    }

    // case TopicsActions.ActionTypes.AddNormalizedTopics: {
    //   return adapter.addMany(action.topics, state);
    // }
    // case topicsActions.ActionTypes.AddContentRefToTopic: {
    //   const topic = {...state.entities[action.topicId]} as any;
    //
    //   return adapter.updateOne({id: action.topicId, changes: {content: topic.content.concat(action.contentId)}}, state);
    // }

    case topicsActions.ActionTypes.FetchTopicSuccess: {
      return adapter.addOne(action.topic, state);
    }

    case topicsActions.ActionTypes.CreateTopicSuccess: {
      return adapter.addOne(action.topic, state);
    }
  }

  return state;
}

export const getState = createFeatureSelector<State>('topics');
