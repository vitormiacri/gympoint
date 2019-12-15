import HelpOrder from '../../Models/HelpOrder';
import Student from '../../Models/Student';

import Queue from '../../../lib/Queue';
import HelpOrderResponseMail from '../../jobs/HelpOrderResponseMail';

class CreateHelpOrderService {
  async run({ id, answer }) {
    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      throw new Error('Pedido de ajuda não encontrado.');
    }

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(HelpOrderResponseMail.key, {
      helpOrder,
    });

    return helpOrder;
  }
}

export default new CreateHelpOrderService();
