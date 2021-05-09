const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../app');

let mongoServer;
beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

global.signup = async () => {
  const email = 'sanket@patel.com';
  const password = 'password';

  const response = await request(app)
    .post('/sign-up')
    .send({
      email: email,
      password: password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
}
