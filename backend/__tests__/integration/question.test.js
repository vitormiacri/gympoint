import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Question', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('must be able to create new question', async () => {
    const student = await factory.create('Student');

    const response = await request(app)
      .post(`/questions/${student.id}`)
      .send({
        question: 'Quantas vezes na semana devo treinar?',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('Question field is required', async () => {
    const student = await factory.create('Student');

    const response = await request(app).post(`/questions/${student.id}`);

    expect(response.status).toBe(400);
  });

  it('should be validate if student exists', async () => {
    const response = await request(app)
      .post(`/questions/99999`)
      .send({
        question: 'Quantas vezes na semana devo comer proteína?',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be return all checkins for a student', async () => {
    const student = await factory.create('Student');

    await request(app)
      .post(`/questions/${student.id}`)
      .send({
        question: 'Quantas vezes na semana devo comer proteína?',
      });

    const response = await request(app).get(`/questions/${student.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
