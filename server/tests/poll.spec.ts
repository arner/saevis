var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Poll unit tests:', () => {
    it('Should create a Poll instance', (done: Function) => {
        api.post('/polls').send({}).expect(200, done);
    });
});
