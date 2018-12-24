var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Attachment unit tests:', () => {
    it('Should upload an attachment', (done: Function) => {
        api.post('/attachment/upload')
          .send({})
          .expect(200, done);
    });
});
