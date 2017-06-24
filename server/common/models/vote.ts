import { Model } from '@mean-expert/model';
import {Helper} from '../../server/services/helper';
/**
 * @module Vote
 * @description
 * Write a useful Vote Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class Vote {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
    new Helper(this.model).disableRemoteMethods(['voter', 'poll']);
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Vote: Before Save');
    next();
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = Vote;
