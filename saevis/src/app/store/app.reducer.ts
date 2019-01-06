import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Params, Data} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';

import * as fromTopics from '../topics/store/topics.reducer';
import * as fromContent from '../content/store/content.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}

export interface State {
  content: fromContent.State;
  topics: fromTopics.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  content: fromContent.reducer,
  topics: fromTopics.reducer,
  routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const {queryParams} = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const {params, data} = state;

    return {
      url,
      queryParams,
      params,
      data
    };
  }
}
