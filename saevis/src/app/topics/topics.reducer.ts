import * as topicsActions from './topics.actions';
import {Topic} from '../api/model/topic';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const adapter: EntityAdapter<Topic> = createEntityAdapter<Topic>();

export interface State extends EntityState<Topic> {
  selectedTopicId: number | null
}

export const initialState: State = adapter.getInitialState({
  selectedTopicId: null
});

export function reducer(state = initialState, action: topicsActions.Union): State {
  switch (action.type) {
    case topicsActions.ActionTypes.GetTopicsSuccess: {
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

    case topicsActions.ActionTypes.SelectTopic: {
      return {
        ...state,
        selectedTopicId: action.id
      };
    }

    case topicsActions.ActionTypes.SelectTopicSuccess: {
      return adapter.addOne(action.topic, state);
    }
  }

  return state;
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();


export const getState = createFeatureSelector<State>('topics');
export const getSelectedTopicId = createSelector(
  getState,
  (state: State) => state.selectedTopicId
);

export const getTopics = createSelector(
  getState,
  selectEntities
);

export const getAll = createSelector(getState, selectAll);
export const getCurrent = createSelector(
  getTopics,
  getSelectedTopicId,
  (entities, id) => entities[id]
);
