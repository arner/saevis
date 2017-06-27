import * as mocha from 'mocha';
var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Vote unit tests:', () => {
    it('Should create a Vote instance', (done: Function) => {
        api.post('/votes').send({}).expect(200, done);
    });
});
