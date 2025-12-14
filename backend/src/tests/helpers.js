const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Sweet = require('../models/sweet');



exports.getUserToken = async (role = 'USER') => {
  const email = `${role.toLowerCase()}@test.com`;
  const password = '123456';

  // register
  await request(app)
    .post('/api/auth/register')
    .send({ email, password });

  // force admin
  if (role === 'ADMIN') {
    await User.findOneAndUpdate({ email }, { role: 'ADMIN' });
  }

  // login
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password });

  return res.body.token;
};

exports.createSweet = async () => {
  const adminToken = await exports.getUserToken('ADMIN');

  const res = await request(app)
    .post('/api/sweets')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      name: 'Test Sweet',
      category: 'Indian',
      price: 10,
      quantity: 5
    });

     // 🔥 ADD THIS
  if (res.statusCode !== 201) {
    throw new Error('Sweet creation failed in test helper');
  }

  return res.body; // ✅ full sweet with _id
};

