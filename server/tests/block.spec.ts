import * as mocha from 'mocha';
var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Block unit tests:', () => {
    it('Should create a Block instance', (done: Function) => {
        api.post('/blocks').send({
            type: 'test'
        }).expect(200, done);
    });
});
