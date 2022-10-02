/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../server/server.js')

describe('API Test', () => {

 test('GET /', (done) => {
    request('http://localhost:3000')
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

  test('POST /', (done) => {
    request('http://localhost:3000')
      .post('/')
      .expect("Content-Type", /json/)
      .send({
        username: 'test123@gmail.com',
        password: '123'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

})