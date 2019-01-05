import * as fromTopics from './topics/topics.reducer';
import * as fromContent from './content/content.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  content: fromContent.State;
  topics: fromTopics.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  content: fromContent.reducer,
  topics: fromTopics.reducer
};

export const getTopicsState = createFeatureSelector<State, fromTopics.State>('topics');
export const {
  selectEntities: selectTopicEntities,
  selectAll: selectAllTopics,
} = fromTopics.adapter.getSelectors(getTopicsState);

export const getContentState = createFeatureSelector<State, fromContent.State>('content');
export const {
  selectEntities: selectContentEntities,
  selectAll: selectAllContent
} = fromContent.adapter.getSelectors(getContentState);

export const getAllTopics = createSelector(
  selectTopicEntities,
  selectContentEntities,
  (topics, content) => Object.keys(topics).map(id => ({
    ...topics[id],
        content: Object.keys(content)
          .map(cId => content[cId])
          .filter(cItem => cItem.topicId.toString() === id.toString())
    })
  )
);

export const getCurrentTopic = createSelector(
  selectTopicEntities,
  selectContentEntities,
  fromTopics.getSelectedTopicId,
  (topics, content, id) => ({
      ...topics[id],
      content: Object.keys(content)
        .map(cId => content[cId])
        .filter(cItem => cItem.topicId.toString() === id.toString())
  })
);
