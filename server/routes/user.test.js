const request = require('supertest');
const express = require('express')

const app = express()
app.use('/', require('./index').user);

describe('API Test', () => {

 test('GET /', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect("Content-Type", /html/)
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

  test('GET Bad Route Request', (done) => {
    request(app)
      .get('/abc')
      .expect(404)
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

  

});