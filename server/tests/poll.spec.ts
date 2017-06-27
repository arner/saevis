import * as mocha from 'mocha';
const should    = require('chai').should();
const supertest = require('supertest');
const api       = supertest('http://localhost:3000/api');

describe('Poll tests:', () => {
  const validPoll = {topicId: 1, options: [{text: 'Option 1'}, {text: 'Option 2'}], settings: {multipleChoice: false}};
  const multipleChoicePoll = {topicId: 1, options: [{text: 'Option 1'}, {text: 'Option 2'}], settings: {multipleChoice: true}};

  describe('An authorized user', () => {
    let token: string;
    before((done: Function) => {
      api.post('/members/login').send({email:'arne@example.com', password: 'password'}).end((err: Error, res: any) => {
        if (err) {
          return done(err);
        }
        token = res.body.id;
        done();
      });
    });

    describe('creating a poll', () => {
      it('Should create a Poll instance', (done: Function) => {
        api.post('/polls').set('Authorization', token).send(validPoll).expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }
          res.body.creatorId.should.equal(1);
          done();
        });
      });

      it('Cannot create a Poll with only one option', (done: Function) => {
        api.post('/polls').set('Authorization', token).send({topicId: 1, options: [{text: 'Option 1'}]}).expect(422, done);
      });

      it('Cannot create a Poll with no text in one of the options', (done: Function) => {
        api.post('/polls').set('Authorization', token).send({topicId: 1, options: [{text: 'Option 1'}, {}]}).expect(422, done);
      });

      it('Cannot create a Poll with empty text in one of the options', (done: Function) => {
        api.post('/polls').set('Authorization', token).send({topicId: 1, options: [{text: 'Option 1'}, {text: ''}]}).expect(422, done);
      });

    });


    describe('On an existing poll', () => {
      let polls: any[] = [];
      beforeEach((done: Function) => {
        // Create new poll
        api.post('/polls').send(validPoll).expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }
          polls.push(res.body);
          done();
        });
      });

      it('should not have voted', (done: Function) => {
        api.get(`/polls/${polls.pop().id}`).set('Authorization', token).expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }
          res.body.userVoted.should.be.false;
          done();
        });
      });

      it('should vote', (done: Function) => {
        api.post(`/polls/${polls.pop().id}/votes`).set('Authorization', token).send({value: [1]}).expect(200, done);
      });

      it('cannot vote on two options on single choice poll', (done: Function) => {
        api.post(`/polls/${polls.pop().id}/votes`).set('Authorization', token).send({value: [0, 1]}).expect(422, done);
      });
    });

    describe('after voting once', () => {
      let poll: any;

      before((done: Function) => {
        // Create new poll
        api.post('/polls').send(validPoll).expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }

          poll = res.body;
          api.post(`/polls/${poll.id}/votes`).set('Authorization', token).send({value: [1]}).expect(200, done);
        });
      });

      it('cannot vote again', (done: Function) => {
        api.post(`/polls/${poll.id}/votes`).set('Authorization', token).send({value: [1]}).expect(403, done);
      });

      it('has voted', (done: Function) => {
        api.get(`/polls/${poll.id}`).set('Authorization', token).expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }
          res.body.userVoted.should.be.true;
          res.body.options[1].votes.should.equal(1);
          res.body.options[0].votes.should.equal(0);
          done();
        });
      });

      it('has voted according to the topic child', (done: Function) => {
        api.get(`/topics/${poll.topicId}?filter[include][blocks]=blockContent`).set('Authorization', token).expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }
          const ourPoll = res.body.blocks.find((block: any) => block.blockContentId === poll.id).blockContent;
          ourPoll.userVoted.should.be.true;
          done();
        });
      });

      // API endpoint blocked
      // it('has voted according to the list', (done: Function) => {
      //   api.get(`/polls`).set('Authorization', token).expect(200, (err: Error, res: any) => {
      //     if (err) {
      //       return done(err);
      //     }
      //     const ourPoll = res.body.find((p: any) => p.id === poll.id);
      //     console.log(ourPoll);
      //     ourPoll.userVoted.should.be.true
      //     done();
      //   });
      // });
    });
  });
});
