import * as mocha from 'mocha';
var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Block unit tests:', () => {
    it('Should not create a Block instance', (done: Function) => {
        api.post('/blocks').send({
            type: 'test'
        }).expect(404, done);
    });
});
