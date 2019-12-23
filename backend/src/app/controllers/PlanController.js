import Plan from '../Models/Plan';
import CreatePlanService from '../services/plan/CreatePlanService';
import UpdatePlanService from '../services/plan/UpdatePlanService';
import DeletePlanService from '../services/plan/DeletePlanService';

class PlanController {
  async index(req, res) {
    const { page = 1, perPage = 5 } = req.query;

    const plans = await Plan.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      order: ['id'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    try {
      const plan = await CreatePlanService.run({
        plan: req.body,
      });

      return res.json(plan);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const plan = await UpdatePlanService.run({
        planId: req.params.id,
        newPlan: req.body,
      });

      return res.json(plan);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await DeletePlanService.run({
        planId: req.params.id,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new PlanController();
