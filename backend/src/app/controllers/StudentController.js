import { Op } from 'sequelize';

import CreateStudentService from '../services/student/CreateStudentService';
import UpdateStudentService from '../services/student/UpdateStudentService';
import Student from '../Models/Student';
import capitalize from '../utils/capitalize';

class StudentController {
  async index(req, res) {
    const { name } = req.query;
    const where = {};
    if (name) where.name = { [Op.substring]: capitalize(name) };
    const students = await Student.findAll({
      where,
    });

    return res.json(students);
  }

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
