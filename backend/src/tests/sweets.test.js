const request = require('supertest');
const app = require('../app');
const { getUserToken } = require('./helpers');

describe('SWEETS API', () => {
  let adminToken;

  beforeEach(async () => {
    adminToken = await getUserToken('ADMIN');
  });

  it('creates a sweet (ADMIN)', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Ladoo',
        price: 10,
         category: 'Indian',   // ✅ ADD THIS LINE
        quantity: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Ladoo');
  });
});
