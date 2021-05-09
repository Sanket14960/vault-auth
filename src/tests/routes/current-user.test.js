const request = require('supertest');
const { app } = require('../../app');

it('verify cookie', async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .get('/current-user')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('sanket@patel.com');
});

it('if not authenticated or no cookie found', async () => {
  const response = await request(app)
    .get('/current-user')
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual(null);
});
