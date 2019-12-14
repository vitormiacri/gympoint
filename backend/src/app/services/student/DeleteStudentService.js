import Student from '../../Models/Student';

class DeleteStudentService {
  async run({ studentId }) {
    const student = await Student.findByPk(studentId);

    if (!student) {
      throw new Error('Aluno não encontrado.');
    }

    await student.destroy();

    return true;
  }
}

export default new DeleteStudentService();
