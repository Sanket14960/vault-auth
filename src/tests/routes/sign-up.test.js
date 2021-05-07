const request = require('supertest');
const { app } = require('../../app');


describe('Testing /sign-up api', () => {
  it('Returns a 201 successful', async () => {
    return request(app)
      .post('/sign-up')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  });
});
