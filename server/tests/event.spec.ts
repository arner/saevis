import * as mocha from 'mocha';
var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

const validEvent = {
  startTime: new Date('Tue Jun 20 2017 21:27:04 GMT+0200 (CEST)'),
  endTime: new Date('Tue Jun 20 2017 21:27:04 GMT+0200 (CEST)'),
  locationText: 'test',
  location: {lat: 20.100, lng: 20.100}
};
const userId: number = 1;

describe('Event unit tests:', () => {
  describe('An authorized user', () => {
    let token: string;
    before((done: Function) => {
      api.post('/members/login').send({email: 'arne@example.com', password: 'password'}).end((err: Error, res: any) => {
        if (err) {
          return done(err);
        }
        token = res.body.id;
        done();
      });
    });

    it('Should create a Event instance', (done: Function) => {
      api.post('/events').set('Authorization', token).send(validEvent).expect(200, done);
    });

    describe('On an existing event', () => {
      let events: any[] = [];
      beforeEach((done: Function) => {
        // Create new event
        api.post('/events').set('Authorization', token).send(validEvent).expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }
          events.push(res.body);
          done();
        });
      });

      it('should participate', (done: Function) => {
        api.put(`/events/${events.pop().id}/participants/rel/${userId}`).set('Authorization', token).send().expect(200, (err: Error, res: any) => {
          if (err) {
            return done(err);
          }
          done();
        });
      });

      it('cannot let someone else participate', (done: Function) => {
        api.put(`/events/${events.pop().id}/participants/rel/2`).set('Authorization', token).send().expect(403, done);
      });

      describe('after participating', () => {
        let participating: any[] = [];
        beforeEach((done: Function) => {
          // Create new event
          api.post('/events').set('Authorization', token).send(validEvent).expect(200, (err: Error, res: any) => {
            if (err) {
              return done(err);
            }
            let e = events.pop();
            participating.push(e);
            api.put(`/events/${e.id}/participants/rel/${userId}`).set('Authorization', token).send().expect(200, done);
          });
        });

        it('should unparticipate', (done: Function) => {
          api.delete(`/events/${participating.pop().id}/participants/rel/${userId}`).set('Authorization', token).send().expect(204, done);
        });
      });
    });
  });
});
