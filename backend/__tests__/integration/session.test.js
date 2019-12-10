import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import User from '../../src/app/Models/User';

describe('Session', () => {
  it('Admin must be able to authenticate', async () => {
    await User.create({
      name: 'Administrador',
      email: 'admin@gympoint.com',
      password_hash: bcrypt.hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'admin@gympoint.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });
});
