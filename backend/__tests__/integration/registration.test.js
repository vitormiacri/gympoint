import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import getAuthorizationToken from '../util/authorization';
import factory from '../factories';

describe('Registration', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('must be able to create new registration', async () => {
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const registration = await factory.attrs('Registration', {
      student: student.id,
      plan: plan.id,
    });

    const token = await getAuthorizationToken();

    const response = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('All registration fields are required', async () => {
    const student = await factory.create('Student');

    const registration = await factory.attrs('Registration', {
      student: student.id,
    });
    const token = await getAuthorizationToken();
    const response = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to register two registration for one student', async () => {
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const registration = await factory.attrs('Registration', {
      student: student.id,
      plan: plan.id,
    });

    const token = await getAuthorizationToken();

    await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able validate if plan exists on insert', async () => {
    const registration = await factory.attrs('Registration', {
      student: 9999,
      plan: 9999,
    });

    const token = await getAuthorizationToken();

    const response = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able validate if student exists on insert', async () => {
    const plan = await factory.create('Plan');
    const registration = await factory.attrs('Registration', {
      student: 9999,
      plan: plan.id,
    });

    const token = await getAuthorizationToken();

    const response = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('must be able to update a registration', async () => {
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const registration = await factory.attrs('Registration', {
      student: student.id,
      plan: plan.id,
    });

    const token = await getAuthorizationToken();

    const insertResponse = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/registrations/${insertResponse.body.id}`)
      .send({
        ...registration,
        start_date: new Date(),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to validade if registration exists on update', async () => {
    const token = await getAuthorizationToken();
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const response = await request(app)
      .put('/registrations/9999')
      .send({
        student: student.id,
        plan: plan.id,
        start_date: new Date(),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to validade if plan exists on update', async () => {
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const registration = await factory.attrs('Registration', {
      student: student.id,
      plan: plan.id,
    });

    const token = await getAuthorizationToken();

    const insertResponse = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/registrations/${insertResponse.body.id}`)
      .send({
        student: student.id,
        start_date: new Date(),
        plan: 9999,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be able to validade if student exists on update', async () => {
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const registration = await factory.attrs('Registration', {
      student: student.id,
      plan: plan.id,
    });

    const token = await getAuthorizationToken();

    const insertResponse = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .put(`/registrations/${insertResponse.body.id}`)
      .send({
        student: 9999,
        start_date: new Date(),
        plan: plan.id,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('must be able to delete a registration', async () => {
    const student = await factory.create('Student');
    const plan = await factory.create('Plan');
    const registration = await factory.attrs('Registration', {
      student: student.id,
      plan: plan.id,
    });

    const token = await getAuthorizationToken();

    const insertResponse = await request(app)
      .post('/registrations')
      .send(registration)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .delete(`/registrations/${insertResponse.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be validate if registration exists on delete', async () => {
    const token = await getAuthorizationToken();
    const response = await request(app)
      .delete(`/registrations/99999`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be return all registrations', async () => {
    const token = await getAuthorizationToken();
    const response = await request(app)
      .get(`/registrations`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
