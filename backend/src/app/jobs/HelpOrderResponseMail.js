import Mail from '../../lib/Mail';

class HelpOrderResponseMail {
  get key() {
    return 'HelpOrderResponseMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Pedido de Ajuda Respondido',
      template: 'helpOrderResponse',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new HelpOrderResponseMail();
