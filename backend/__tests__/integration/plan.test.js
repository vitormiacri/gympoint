import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import getAuthorizationToken from '../util/authorization';
import factory from '../factories';

describe('Plan', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('must be able to create new plan', async () => {
    const plan = await factory.attrs('Plan');
    const token = await getAuthorizationToken();
    const response = await request(app)
      .post('/plans')
      .send(plan)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('All plan fields are required', async () => {
    const plan = await factory.attrs('Plan');
    const token = await getAuthorizationToken();
    const response = await request(app)
      .post('/plans')
      .send({
        title: plan.title,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated title', async () => {
    const plan = await factory.create('Plan');

    const token = await getAuthorizationToken();

    const response = await request(app)
      .post(`/plans`)
      .send({
        title: plan.title,
        duration: plan.duration,
        price: plan.price,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('must be able to update a plan', async () => {
    const plan = await factory.create('Plan');

    const token = await getAuthorizationToken();

    const response = await request(app)
      .put(`/plans/${plan.id}`)
      .send({
        title: `${plan.title} alterado`,
        duration: plan.duration,
        price: plan.price,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be validate if plan not exists on update', async () => {
    const plan = await factory.attrs('Plan');

    const token = await getAuthorizationToken();

    const response = await request(app)
      .put(`/plans/999999`)
      .send(plan)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('must be able to delete a plan', async () => {
    const plan = await factory.create('Plan');
    const token = await getAuthorizationToken();
    const response = await request(app)
      .delete(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be validate if plan not exists on delete', async () => {
    const token = await getAuthorizationToken();
    const response = await request(app)
      .delete(`/plans/99999`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should be return all plans', async () => {
    const token = await getAuthorizationToken();
    const response = await request(app)
      .get(`/plans`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
