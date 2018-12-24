var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Image unit tests:', () => {
    it('Should create a Image instance', (done: Function) => {
        api.post('/images').send({
            url: 'test'
        }).expect(200, done);
    });
});
