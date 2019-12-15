import Checkin from '../Models/Checkin';
import Student from '../Models/Student';

import CreateQuestionService from '../services/question/CreateQuestionService';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    try {
      const { student_id } = req.params;
      const registration = await CreateQuestionService.run({
        student_id,
      });

      return res.json(registration);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new CheckinController();