import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Content} from '../../api/model/content';
import * as contentActions from './content.actions';
import * as eventActions from '../event/event.actions';
import * as discussionActions from '../discussion/discussion.actions';
import {Discussion} from '../../api/model/discussion';

export const adapter: EntityAdapter<Content> = createEntityAdapter<Content>();

export interface State extends EntityState<Content> {
}

export const initialState: State = adapter.getInitialState({
});

export function reducer(state = initialState, action: contentActions.Union | eventActions.Union | discussionActions.Union): State {
  switch (action.type) {
    case contentActions.ActionTypes.CreateContentSuccess: {
      return adapter.addOne(action.content, state);
    }

    case contentActions.ActionTypes.AddManyContentItems: {
      return adapter.addMany(action.contents, state);
    }

    // TODO: move to own reducer
    case eventActions.ActionTypes.ParticipateSuccess: {
      return adapter.updateOne({id: action.event.contentId, changes: {event: action.event}}, state);
    }

    case eventActions.ActionTypes.UnparticipateSuccess: {
      return adapter.updateOne({id: action.event.contentId, changes: {event: action.event}}, state);
    }

    case discussionActions.ActionTypes.CreateCommentSuccess: {
      const discussion = {...state.entities[action.contentId].discussion} as Discussion;
      discussion.comments = discussion.comments.concat(action.comment);

      return adapter.updateOne({id: action.contentId, changes: {discussion}}, state);
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

export const getState = createFeatureSelector<State>('content');
export const selectContentEntities = createSelector(
  getState,
  selectEntities
);

export const getAll = createSelector(getState, selectAll);
