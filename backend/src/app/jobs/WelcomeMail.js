import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

import formatPrice from '../utils/format';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.name} <${registration.student.email}>`,
      subject: 'Matrícula Realizada',
      template: 'welcome',
      context: {
        student: registration.student.name,
        plan: registration.plan.title,
        price: formatPrice(registration.price),
        start_date: format(
          parseISO(registration.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(registration.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new WelcomeMail();
