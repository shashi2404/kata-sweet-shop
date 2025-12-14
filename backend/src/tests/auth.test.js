const request = require('supertest');
const app = require('../app');

describe('AUTH API', () => {

  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'register@test.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
  });

  it('prevents duplicate registration', async () => {
    // first registration
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@test.com',
        password: '123456'
      });

    // duplicate registration
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'duplicate@test.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(409);
  });

  it('logs in a user and returns token', async () => {
    // register first
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'login@test.com',
        password: '123456'
      });

    // then login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@test.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});
