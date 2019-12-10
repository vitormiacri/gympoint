import CreateStudentService from '../services/student/CreateStudentService';
import UpdateStudentService from '../services/student/UpdateStudentService';

class StudentController {
  async store(req, res) {
    const student = await CreateStudentService.run({
      student: req.body,
    });

    return res.json(student);
  }

  async update(req, res) {
    const student = await UpdateStudentService.run({
      studentId: req.params.id,
      newStudent: req.body,
    });

    return res.json(student);
  }
}

export default new StudentController();
