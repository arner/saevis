import { Action } from '@ngrx/store';
import {Content} from '../api/model/content';

export enum ActionTypes {
  CreateContent = '[ContentApi] Create content',
  CreateContentSuccess = '[Content] Create content success',
  StoreManyContentTypes = '[Content] Normalize and store many content items',
  AddManyContentItems = '[Content] Add many'
}

export class CreateContent implements Action {
  public readonly type = ActionTypes.CreateContent;

  constructor(public readonly content: Content) {}
}

export class CreateContentSuccess implements Action {
  public readonly type = ActionTypes.CreateContentSuccess;

  constructor(public readonly content: Content) {}
}

export class StoreManyContentTypes implements Action {
  public readonly type = ActionTypes.StoreManyContentTypes;

  constructor(public readonly contents: Content[]) {}
}

export class AddManyContentItems implements Action {
  public readonly type = ActionTypes.AddManyContentItems;

  constructor(public readonly contents: Content[]) {}
}

export type Union = AddManyContentItems | StoreManyContentTypes | CreateContent | CreateContentSuccess;
