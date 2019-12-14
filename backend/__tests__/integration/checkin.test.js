import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Checkin', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('must be able to create new checkin', async () => {
    const student = await factory.create('Student');

    const response = await request(app).post(`/students/${student.id}/checkin`);

    expect(response.body).toHaveProperty('id');
  });

  it('should be validate if student exists', async () => {
    const response = await request(app).post(`/students/99999/checkin`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be validate a total of 5 checkins in a week', async () => {
    const student = await factory.create('Student');

    await request(app).post(`/students/${student.id}/checkin`);
    await request(app).post(`/students/${student.id}/checkin`);
    await request(app).post(`/students/${student.id}/checkin`);
    await request(app).post(`/students/${student.id}/checkin`);
    await request(app).post(`/students/${student.id}/checkin`);

    const response = await request(app).post(`/students/${student.id}/checkin`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be return all checkins for a student', async () => {
    const student = await factory.create('Student');

    await request(app).post(`/students/${student.id}/checkin`);
    await request(app).post(`/students/${student.id}/checkin`);

    const response = await request(app).get(`/students/${student.id}/checkin`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
