var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Member unit tests:', () => {
    it('Should create a Member instance', (done: Function) => {
        api.post('/members').send({}).expect(200, done);
    });
});
