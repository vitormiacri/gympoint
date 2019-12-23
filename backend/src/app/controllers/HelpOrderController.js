import HelpOrder from '../Models/HelpOrder';
import Student from '../Models/Student';

import CreateHelpOrderService from '../services/helporder/CreateHelpOrderService';

class HelpOrderController {
  async index(req, res) {
    const { page = 1, perPage = 5 } = req.query;

    const helpOrders = await HelpOrder.findAndCountAll({
      where: {
        answer_at: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
      order: ['created_at'],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const registration = await CreateHelpOrderService.run({
        id,
        answer: req.body.answer,
      });

      return res.json(registration);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new HelpOrderController();
