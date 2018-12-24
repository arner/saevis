import * as request from 'supertest';
import {Helper} from './Helper';

const helper = new Helper();
const URL = `${helper.baseURL}/topics`;

describe('Topics (e2e)', () => {
  let token: string;

  beforeAll(async () => {
    token = await helper.getToken();
  });

  it('/ (POST) ok', () => {
    return request(URL)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.getTestTopic())
      .expect(201)
      .then(res => {
        expect(res.body.title).toEqual(helper.getTestTopic().title);
        expect(res.body.id).toBeGreaterThan(0);
      })
  });

  it('/ (POST) short title', () => {
    const topic = helper.getTestTopic();
    topic.title = 'a';

    return request(URL)
      .post('/')
      .set('Authorization', `Bearer ${token}`)
      .send({title: ''})
      .expect(400)
  });
});

//
// .set('Content-Type', 'application/json')
// .set('user-agent', 'x')