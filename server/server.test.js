/**
 * @jest-environment node
 */

const app = require('./server');
const request = require('supertest');

describe('Server', () => {
  it('Respond with 200 status code on health', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
  });

  xit('Respond with 302 status code', async () => {
    const response = await request(app).get('/login/auth/google');
    expect(response.statusCode).toBe(302);
  });

  it('Respond with 404 status code for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.statusCode).toBe(404);
  });
});
