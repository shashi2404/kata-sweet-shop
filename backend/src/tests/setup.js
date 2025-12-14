const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' });

jest.setTimeout(30000);

beforeAll(async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }

  await mongoose.connection.close();
});
