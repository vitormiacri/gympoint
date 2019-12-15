import HelpOrder from '../Models/HelpOrder';
import Student from '../Models/Student';

import CreateQuestionService from '../services/question/CreateQuestionService';

class QuestionController {
  async index(req, res) {
    const { student_id } = req.params;

    const questions = await HelpOrder.findAll({
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

    return res.json(questions);
  }

  async store(req, res) {
    try {
      const { student_id } = req.params;
      const registration = await CreateQuestionService.run({
        student_id,
        question: req.body.question,
      });

      return res.json(registration);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new QuestionController();
