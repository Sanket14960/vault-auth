const request = require('supertest');
const { app } = require('../../app');

it('Returns a 201 successful', async () => {
  await request(app)
    .post('/sign-up')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 - check for spaces in user input', async () => {
  await request(app)
    .post('/sign-up')
    .send({
      email: ' ',
      password: ' '
    })
    .expect(400);
});

it('returns a 400 - empty user input', async () => {
  await request(app)
    .post('/sign-up')
    .send({
      email: '',
      password: ''
    })
    .expect(400);
});

it('Returns a 201 detect if cookie is set', async () => {
  const response = await request(app)
    .post('/sign-up')
    .send({
      email: 'test1@test.com',
      password: 'password'
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
