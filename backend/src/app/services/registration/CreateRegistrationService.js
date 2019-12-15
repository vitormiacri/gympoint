import { parseISO, addMonths } from 'date-fns';

import Registration from '../../Models/Registration';
import Plan from '../../Models/Plan';
import Student from '../../Models/Student';

import Queue from '../../../lib/Queue';
import WelcomeMail from '../../jobs/WelcomeMail';

class CreateRegistrationService {
  async run({ registration }) {
    const registrationExists = await Registration.findOne({
      where: { student_id: registration.student },
    });

    if (registrationExists) {
      throw new Error('O aluno já possui plano.');
    }

    const plan = await Plan.findByPk(registration.plan);

    if (!plan) {
      throw new Error('Plano não encontrado.');
    }

    const student = await Student.findByPk(registration.student);
    if (!student) {
      throw new Error('Aluno não encontrado.');
    }

    const end_date = addMonths(
      parseISO(registration.start_date),
      plan.duration
    );

    registration.price = plan.price * plan.duration;

    const { id } = await Registration.create({
      student_id: registration.student,
      plan_id: plan.id,
      start_date: registration.start_date,
      end_date,
      price: registration.price,
    });

    const registrationCreated = await Registration.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    await Queue.add(WelcomeMail.key, {
      registration: registrationCreated,
    });

    return registrationCreated;
  }
}

export default new CreateRegistrationService();
