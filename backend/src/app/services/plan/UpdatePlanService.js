import Plan from '../../Models/Plan';

class CreatePlanService {
  async run({ planId, newPlan }) {
    const plan = await Plan.findByPk(planId);

    if (!plan) {
      throw new Error('Plano não encontrado.');
    }

    await plan.update(newPlan);

    const { id, title, duration, price } = plan;

    return {
      id,
      title,
      duration,
      price,
    };
  }
}

export default new CreatePlanService();
