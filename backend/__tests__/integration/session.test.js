import request from 'supertest';
import app from '../../src/app';

describe('Session', () => {
  it('Admin must be able to authenticate', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('Admin login fields are required', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
      });

    expect(response.status).toBe(400);
  });

  it('Admin user must exist', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin2@gympoint.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });

  it('Admin user password must fail', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: '1234567',
      });

    expect(response.status).toBe(400);
  });
});
