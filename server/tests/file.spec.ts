var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('File unit tests:', () => {
    it('Should create a File instance', (done: Function) => {
        api.post('/files').send({
            url: 'test',
            type: 'test',
            name: 'test'
        }).expect(200, done);
    });
});
