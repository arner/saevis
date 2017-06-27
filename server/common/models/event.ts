import { Model } from '@mean-expert/model';
/**
 * @module Event
 * @description
 * Write a useful Event Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    // participate: {
    //   accepts: [
    //     {arg: 'ctx', type: 'object', http: { source: 'context' }},
    //     {arg: 'id', type: 'number', required: true}
    //   ],
    //   returns : { arg: 'result', type: 'event', root: true },
    //   http    : { path: '/:id/participate', verb: 'post' }
    // }
  }
})

class Event {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Event: Before Save');
    next();
  }
}

module.exports = Event;
