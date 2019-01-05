import { Action } from '@ngrx/store';
import {Event} from '../../api/model/event';

export enum ActionTypes {
  AddOne = '[Event] Add One',
  Participate = '[EventApi] Participate',
  ParticipateSuccess = '[Event] Participate success',
  Unparticipate = '[Event] Unparticipate',
  UnparticipateSuccess = '[Event] Unparticipate success'
}

export class AddOne implements Action {
  public readonly type = ActionTypes.AddOne;

  constructor(public readonly event: Event) {}
}

export class Participate implements Action {
  public readonly type = ActionTypes.Participate;

  constructor(public readonly id: number) {}
}

export class ParticipateSuccess implements Action {
  public readonly type = ActionTypes.ParticipateSuccess;

  constructor(public readonly event: Event) {}
}

export class UnparticipateSuccess implements Action {
  public readonly type = ActionTypes.UnparticipateSuccess;

  constructor(public readonly event: Event) {}
}

export class Unparticipate implements Action {
  public readonly type = ActionTypes.Unparticipate;

  constructor(public readonly id: number) {}
}

export type Union = AddOne | Participate | ParticipateSuccess | Unparticipate | UnparticipateSuccess;
