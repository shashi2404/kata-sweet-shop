const request = require('supertest');
const app = require('../app');
const { getUserToken, createSweet } = require('./helpers');
const Sweet = require('../models/sweet');

describe('INVENTORY API', () => {
  let userToken;
  let sweetId;

  beforeEach(async () => {
    await Sweet.deleteMany({}); // ✅ THIS LINE FIXES EVERYTHING
    userToken = await getUserToken('USER');

    const sweet = await createSweet(); // created via API
    sweetId = sweet._id.toString();
  });

  it('purchases sweet successfully', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`) // ✅ FIXED
      .set('Authorization', `Bearer ${userToken}`)
      .send({ qty: 2 });

    expect(res.statusCode).toBe(200);
  });

  it('prevents purchase if stock insufficient', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`) // ✅ FIXED
      .set('Authorization', `Bearer ${userToken}`)
      .send({ qty: 10 });

    expect(res.statusCode).toBe(409);
  });
});
