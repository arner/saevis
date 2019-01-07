import * as request from 'supertest';
import {Helper} from './helper';
import {User} from '../src/users/user.entity';

const helper = new Helper();
const createURL = `${helper.baseURL}/content`;
const eventURL = `${helper.baseURL}/events`;
const testUser = new User({
  id: 1,
  username: 'arne'
});

const getTestEvent = () => {
  return {
    startTime: '2017-06-07T14:34:08.700Z',
    endTime: '2017-06-07T16:34:08.700Z',
    text: 'Vergadering'
    //locationText: 'test',
    //location: {lat: 20.100, lng: 20.100}
  };
};

describe('Event (e2e)', () => {
  let token: string;
  let topicId: number;
  let createdEvent: any;

  beforeAll(async () => {
    token = await helper.getToken(testUser);
    topicId = await helper.createTestTopic(token);

    return request(createURL)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({topicId: topicId, event: getTestEvent()})
      .expect(201)
      .then(res => {
        createdEvent = res.body.event;

        expect(createdEvent.text).toEqual(getTestEvent().text);
        expect(createdEvent.startTime).toEqual(getTestEvent().startTime);
        expect(createdEvent.endTime).toEqual(getTestEvent().endTime);
        expect(createdEvent.id).toBeGreaterThan(0);
      });
  });

  it('/:id/participants (POST) ok', () => {
    return request(eventURL)
      .post(`/${createdEvent.id}/participants`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .then(res => {
        expect(res.body.text).toEqual(createdEvent.text);
        expect(res.body.startTime).toEqual(createdEvent.startTime);
        expect(res.body.endTime).toEqual(createdEvent.endTime);
        expect(res.body.participants).toEqual([testUser]);
      });
  });

  it('/:id/participants (POST) 2nd time should not have 2 entries', () => {
    return request(eventURL)
      .post(`/${createdEvent.id}/participants`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .then(res => {
        expect(res.body.text).toEqual(createdEvent.text);
        expect(res.body.startTime).toEqual(createdEvent.startTime);
        expect(res.body.endTime).toEqual(createdEvent.endTime);
        expect(res.body.participants).toEqual([testUser]);
      });
  });

  it('/:id/participants (DELETE) ok', () => {
    return request(eventURL)
      .delete(`/${createdEvent.id}/participants`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => {
        expect(res.body.text).toEqual(createdEvent.text);
        expect(res.body.startTime).toEqual(createdEvent.startTime);
        expect(res.body.endTime).toEqual(createdEvent.endTime);
        expect(res.body.participants).toEqual(expect.not.arrayContaining([testUser]));
      });
  });

  it('/:id (PUT) edit event', () => {
    const editedEvent = getTestEvent() as any;
    editedEvent.startTime = '2017-06-07T14:34:08.700Z';
    editedEvent.endTime = '2017-06-07T16:34:08.700Z';
    editedEvent.text = 'Vergadering edit';
    editedEvent.participants = [testUser];
    editedEvent.id = createdEvent.id;

    return request(eventURL)
      .put(`/${createdEvent.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(editedEvent)
      .expect(200)
      .then(res => {
        expect(res.body.text).toEqual(editedEvent.text);
        expect(res.body.startTime).toEqual(editedEvent.startTime);
        expect(res.body.endTime).toEqual(editedEvent.endTime);
        expect(res.body.participants).toEqual([]);
      });
  });

  // it('/ (GET)', () => {
  //   console.log({topicId});
  //   console.log(getTestEvent(topicId));
  //
  //   return request(createURL)
  //     .get('/')
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200)
  //     .then(res => {
  //       expect(res.body).toEqual(expect.arrayContaining([createdEvent]));
  //     });
  // });
  //
  // it('/:id (GET)', () => {
  //   console.log({topicId});
  //   console.log(getTestEvent(topicId));
  //
  //   return request(eventURL)
  //     .get(`/${}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(201)
  //     .then(res => {
  //       expect(res.body).toEqual(expect.arrayContaining([createdEvent]));
  //     });
  // });
});
