import HelpOrder from '../Models/HelpOrder';
import Student from '../Models/Student';

import CreateHelpOrderService from '../services/helporder/CreateHelpOrderService';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
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
