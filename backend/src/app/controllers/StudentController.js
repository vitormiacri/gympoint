import CreateStudentService from '../services/student/CreateStudentService';
import UpdateStudentService from '../services/student/UpdateStudentService';

class StudentController {
  async store(req, res) {
    try {
      const student = await CreateStudentService.run({
        student: req.body,
      });

      return res.json(student);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const student = await UpdateStudentService.run({
        studentId: req.params.id,
        newStudent: req.body,
      });

      return res.json(student);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new StudentController();
