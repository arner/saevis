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
    beforeParticipate: { name: 'prototype.__link__participants', type: 'beforeRemote' },
    beforeUnParticipate: { name: 'prototype.__unlink__participants', type: 'beforeRemote' }
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

  beforeParticipate(ctx: any, user: any, next: Function) {
    const userId = ctx.req.accessToken.userId;
    if (ctx.req.params.fk != userId) {
      let error: any;
      error = new  Error('Forbidden.');
      error.status = 403;
      return next(error);
    }
    return next();
  }

  beforeUnParticipate(ctx: any, user: any, next: Function) {
    return this.beforeParticipate(ctx, user, next);
  }
}

module.exports = Event;
