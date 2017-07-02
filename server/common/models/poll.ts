import { Model } from '@mean-expert/model';
import {Helper} from '../../server/services/helper';
/**
 * @module Poll
 * @description
 * Write a useful Poll Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeVote: { name: 'prototype.__create__votes', type: 'beforeRemote' },
    afterVote: { name: 'prototype.__create__votes', type: 'afterRemote' },
    onLoad: { name: 'loaded', type: 'operation' },
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
  }
})

class Poll {
  constructor(public model: any) {
    // Validate options
    this.model.validatesLengthOf('options', {min: 2});
    this.model.validate('options', function(err: Function) {
      if (this.options.filter((option: PollOption) => !option.text).length) {
        return err('All options need text.');
      }
    });

    new Helper(this.model).disableRemoteMethods(['topic', 'votes'], ['prototype.__create__votes', 'prototype.__get__votes']);
  }

  /**
   * Append voter id
   * @param ctx
   * @param user
   * @param next
   * @returns {Promise<any>}
   */
  async beforeVote(ctx: any, user: any, next: Function): Promise<any> {
    const userId = ctx.req.accessToken.userId;

    // Check if this user hasn't voted.
    const existingVote = await this.model.app.models.Vote.findOne({where: {pollId: ctx.instance.id, voterId: userId}});
    if (!!existingVote) {
      ctx.res.statusCode = 403;
      return next({message: 'Already voted!', statusCode: 403});
    }

    // Validate
    if (!ctx.instance.settings.multipleChoice && ctx.args.data.value.length > 1) {
     return next({message: 'Pick one.', statusCode: 422});
    }

    ctx.args.data.voterId = userId;
    next();
  }

  /**
   * Count the vote to the poll model
   * @param ctx
   * @param user
   * @param next
   */
  afterVote(ctx: any, user: any, next: Function): void {
    // Add vote
    ctx.instance.options
      .filter((option: PollOption) => ctx.args.data.value.indexOf(+option.id) > -1)
      .forEach((option: PollOption) => option.votes++);

    ctx.instance.updateAttribute('options', ctx.instance.options, next);
  }

  /**
   * Fix poll options
   * @param ctx
   * @param next
   * @returns {any}
   */
  beforeSave(ctx: any, next: Function) {
    console.log('Poll: before save');

    // Only on new Polls
    if (!ctx.isNewInstance) {
      return next();
    }

    // Fix options
    ctx.instance.options = ctx.instance.options.map((option: PollOption, index: number): PollOption => {
      return {
        id: index,
        text: option.text,
        votes: 0
      }
    });
    next();
  }

  onLoad(ctx: any, next: Function) {
    console.log('on load poll');
    const token = ctx.options.accessToken;
    if (!token || !token.userId) {
      return next();
    }

    if (Array.isArray(ctx.result)) {
      ctx.data.forEach((result: any) => {
        this.addVotesToResult(result, token.userId);
      });
    } else {
      this.addVotesToResult(ctx.data, token.userId);
    }

    next();
  }

  private addVotesToResult(result: any, userId: number): void {
    if (!result.votes) {
      console.log('No votes!', result);
      return;
    }
    result.userVoted = !!result.votes.find((v: any) => v.voterId === userId);
  }
}

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

module.exports = Poll;
