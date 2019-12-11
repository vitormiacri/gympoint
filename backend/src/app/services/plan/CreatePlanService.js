import Plan from '../../Models/Plan';

class CreatePlanService {
  async run({ plan }) {
    const planExists = await Plan.findOne({
      where: { title: plan.title },
    });

    if (planExists) {
      throw new Error('Este nome de plano já existe.');
    }

    const { id, title, duration, price } = await Plan.create(plan);

    return {
      id,
      title,
      duration,
      price,
    };
  }
}

export default new CreatePlanService();
