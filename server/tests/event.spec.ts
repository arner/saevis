var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Event unit tests:', () => {
    it('Should create a Event instance', (done: Function) => {
        api.post('/events').send({
            startDate: 'Tue Jun 20 2017 21:27:04 GMT+0200 (CEST)',
            endTime: 'Tue Jun 20 2017 21:27:04 GMT+0200 (CEST)',
            locationText: 'test',
            location: { lat: 100.100, lng: 100.100 }
        }).expect(200, done);
    });
});
