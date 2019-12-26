import Registration from '../Models/Registration';
import CreateRegistrationService from '../services/registration/CreateRegistrationService';
import UpdateRegistrationService from '../services/registration/UpdateRegistrationService';
import DeleteRegistrationService from '../services/registration/DeleteRegistrationService';
import Student from '../Models/Student';
import Plan from '../Models/Plan';

class RegistrationController {
  async index(req, res) {
    const { page = 1, perPage = 5 } = req.query;

    const registrations = await Registration.findAndCountAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'id'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'id', 'price', 'duration'],
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    try {
      const registration = await CreateRegistrationService.run({
        registration: req.body,
      });

      return res.json(registration);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const registration = await UpdateRegistrationService.run({
        registrationId: req.params.id,
        newRegistration: req.body,
      });

      return res.json(registration);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await DeleteRegistrationService.run({
        registrationId: req.params.id,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new RegistrationController();
