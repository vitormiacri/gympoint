import Student from '../../Models/Student';

class UpdateStudentService {
  async run({ studentId, newStudent }) {
    const student = await Student.findByPk(studentId);

    if (!student) {
      throw new Error('Aluno não foi encontrado.');
    }

    await student.update(newStudent);

    const { id, name, email, age, weight, height } = await Student.findByPk(
      studentId
    );
    return {
      id,
      name,
      email,
      age,
      weight,
      height,
    };
  }
}

export default new UpdateStudentService();
