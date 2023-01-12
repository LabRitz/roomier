const request = require('supertest');

const app = require('../server/server.js');

describe('API Test', () => {

 test('GET /', (done) => {
    request('http://localhost:3000')
      .get('/')
      .expect(200)
      .expect("Content-Type", /html/)
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

  test('GET Bad URI', (done) => {
    request('http://localhost:3000/')
      .get('/abc')
      .expect(404)
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

  xtest('POST /', (done) => {
    request('http://localhost:3000')
      .post('/')
      .expect("Content-Type", /json/)
      .send({
        username: 'test123@gmail.com',
        password: '123'
      })
      .expect(200)
      .expect(res => {
        res.body.firstName = 'Brennan',
        res.body.lastName = 'Lee',
        username = 'test123@gmail.com',
        password = '$2a$10$kD4jLpxYBgqPP3b0AAECAe5W9GLc97BTR4hlz85/4aAAexz0Hp6DO'
      })
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

  xtest('POST /signup', (done) => {
    request('http://localhost:3000')
      .post('/signup')
      .expect("Content-Type", /json/)
      .send({
        firstName: 'Test',
        lastName: 'Test',
        username: 'test@email.com',
        password: '123',
        zipCode: '00000'
      })
      .expect(200)
      .expect(res => {
        res.body.firstName = 'Test',
        res.body.lastName = 'Test',
        username = 'test@email.com',
        zipCode = '00000'
      })
      .end(function(err, res) {
        if (err) throw err;
        return done()
      })
  });

})