import request from 'supertest';

async function getAuthorizationToken(user, app) {
  const response = await request(app)
    .post('/sessions')
    .send(user);

  return response.body.token;
}

export default getAuthorizationToken;
