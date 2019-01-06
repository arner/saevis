import * as fromRoot from '../../store/app.reducer';
import * as fromTopics from './topics.reducer';
import * as fromContent from '../../content/store/content.reducer'; // TODO tight coupling
import {createSelector} from '@ngrx/store';
import {Topic} from '../../api/model/topic';

export const {
  selectEntities,
  selectTotal,
} = fromTopics.adapter.getSelectors();

export const getSelectedTopicId = createSelector(
  fromRoot.getRouterState,
  (router) => router.state && router.state.params.topicId
);

export const getTopicsEntities = createSelector(
  fromTopics.getState,
  selectEntities
);

const getSelectedTopicNormalized = createSelector(
  getTopicsEntities,
  getSelectedTopicId,
  (topics, id): Topic => topics[id]
);

const normalizeTopic = (topic, allContent) => {
  return {
    ...topic,
    content: Object.keys(allContent)
      .map(cId => allContent[cId])
      .filter(cItem => topic && cItem.topicId.toString() === topic.id.toString())
  }
};

export const selectedTopicExists = createSelector(
  getTopicsEntities,
  getSelectedTopicId,
  (topics, id): boolean => !!topics[id]
);


export const getSelectedTopic = createSelector(
  getSelectedTopicNormalized,
  fromContent.selectContentEntities,
  normalizeTopic
);

export const getAllTopics = createSelector(
  getTopicsEntities,
  fromContent.selectContentEntities,
  (topics, allContent) => Object.keys(topics).map(id => normalizeTopic(topics[id], allContent))
);
