import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../../Models/Checkin';
import Student from '../../Models/Student';

class CreateCheckinService {
  async run({ student_id }) {
    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Aluno não foi encontrado.');
    }

    const today = new Date();
    const pastDate = subDays(today, 7);

    const totalCheckins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [pastDate, today],
        },
      },
    });

    if (totalCheckins.count >= 5) {
      throw new Error('Limite de checkins na semana atingido.');
    }

    const checkin = await Checkin.create({ student_id });

    return checkin;
  }
}

export default new CreateCheckinService();
