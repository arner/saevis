var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Topic unit tests:', () => {
    it('Should create a Topic instance', (done: Function) => {
        api.post('/topics').send({
            id: 12345,
            title: 'test',
            text: 'test'
        }).expect(200, done);
    });
});
