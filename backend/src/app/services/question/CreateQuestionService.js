import HelpOrder from '../../Models/HelpOrder';
import Student from '../../Models/Student';

class CreateQuestionService {
  async run({ student_id, question }) {
    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Aluno não encontrado.');
    }

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    return helpOrder;
  }
}

export default new CreateQuestionService();
