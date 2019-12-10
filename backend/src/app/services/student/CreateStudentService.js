import Student from '../../Models/Student';

class CreateStudentService {
  async run({ student }) {
    const studentExists = await Student.findOne({
      where: { email: student.email },
    });

    if (studentExists) {
      throw new Error('Este aluno já existe.');
    }

    const { id, name, email, age, weight, height } = await Student.create(
      student
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

export default new CreateStudentService();
