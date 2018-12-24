import { Model } from '@mean-expert/model';
import {Helper} from '../../../server/services/helper';
/**
 * @module Vote
 * @description
 * Write a useful Vote Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model()
class Vote {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
    this.model.validatesLengthOf('value', {min: 1});

    new Helper(this.model).disableRemoteMethods(['voter', 'poll']);
  }
}

module.exports = Vote;
