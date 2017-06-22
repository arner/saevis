/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Topic } from '../../models/Topic';
import { Block } from '../../models/Block';
import { Member } from '../../models/Member';
import { Poll } from '../../models/Poll';
import { Event } from '../../models/Event';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Topic: Topic,
    Block: Block,
    Member: Member,
    Poll: Poll,
    Event: Event,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
