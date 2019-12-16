import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';
import getAuthorizationToken from '../util/authorization';

describe('HelpOrder', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('must be able to answer a question', async () => {
    const student = await factory.create('Student');

    const question = await request(app)
      .post(`/questions/${student.id}`)
      .send({
        question: 'Quantas vezes na semana devo treinar?',
      });
    const token = await getAuthorizationToken();

    const response = await request(app)
      .put(`/help-orders/${question.body.id}`)
      .send({
        answer: 'Coma uma pequena porção de carboidratos antes de cada treino.',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('Answer field is required', async () => {
    const student = await factory.create('Student');

    const question = await request(app)
      .post(`/questions/${student.id}`)
      .send({
        question: 'Quantas vezes na semana devo treinar?',
      });
    const token = await getAuthorizationToken();

    const response = await request(app)
      .put(`/help-orders/${question.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should be validate if question exists', async () => {
    const token = await getAuthorizationToken();
    const response = await request(app)
      .put(`/help-orders/99999`)
      .send({
        answer: 'Coma uma pequena porção de carboidratos antes de cada treino.',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be return all question with no answer', async () => {
    const student = await factory.create('Student');

    await request(app)
      .post(`/questions/${student.id}`)
      .send({
        question: 'Quantas vezes na semana devo treinar?',
      });

    const token = await getAuthorizationToken();

    const response = await request(app)
      .get('/help-orders')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
