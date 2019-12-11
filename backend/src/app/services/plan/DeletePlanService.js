import Plan from '../../Models/Plan';

class DeletePlanService {
  async run({ planId }) {
    const plan = await Plan.findByPk(planId);

    if (!plan) {
      throw new Error('Plano não encontrado.');
    }

    await plan.destroy();

    return true;
  }
}

export default new DeletePlanService();
