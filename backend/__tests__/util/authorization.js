import request from 'supertest';
import app from '../../src/app';

async function getAuthorizationToken() {
  const response = await request(app)
    .post('/sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    });

  return response.body.token;
}

export default getAuthorizationToken;
