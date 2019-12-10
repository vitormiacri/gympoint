import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import getAuthorizationToken from '../util/authorization';
import factory from '../factories';

describe('Student', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('must be able to create new student', async () => {
    const student = await factory.attrs('Student');

    const token = await getAuthorizationToken();

    const response = await request(app)
      .post('/students')
      .send(student)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('All student fields are required', async () => {
    const student = await factory.attrs('Student');
    const token = await getAuthorizationToken();
    const response = await request(app)
      .post('/students')
      .send({
        name: student.name,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated email', async () => {
    const student = await factory.create('Student');

    const token = await getAuthorizationToken();

    // Update student
    const response = await request(app)
      .post(`/students`)
      .send({
        name: `${student.name} alterado`,
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('must be able to update a student', async () => {
    const student = await factory.create('Student');

    const token = await getAuthorizationToken();

    const response = await request(app)
      .put(`/students/${student.id}`)
      .send({
        name: `${student.name} alterado`,
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be validate if student not exists', async () => {
    const student = await factory.create('Student');

    const token = await getAuthorizationToken();

    const response = await request(app)
      .put(`/students/55`)
      .send({
        name: `${student.name}`,
        email: student.email,
        age: student.age,
        weight: student.weight,
        height: student.height,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
