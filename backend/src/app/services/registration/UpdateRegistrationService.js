import { parseISO, addMonths } from 'date-fns';

import Registration from '../../Models/Registration';
import Plan from '../../Models/Plan';
import Student from '../../Models/Student';

class UpdateRegistrationService {
  async run({ registrationId, newRegistration }) {
    const registration = await Registration.findByPk(registrationId);

    if (!registration) {
      throw new Error('Matrícula não encontrada.');
    }

    const plan = await Plan.findByPk(newRegistration.plan);

    if (!plan) {
      throw new Error('Plano não encontrado.');
    }

    const student = await Student.findByPk(newRegistration.student);
    if (!student) {
      throw new Error('Aluno não encontrado.');
    }

    const end_date = addMonths(
      parseISO(newRegistration.start_date),
      plan.duration
    );

    const price = plan.price * plan.duration;

    await registration.update({
      student_id: student.id,
      plan_id: plan.id,
      start_date: newRegistration.start_date,
      end_date,
      price,
    });

    return registration;
  }
}

export default new UpdateRegistrationService();
