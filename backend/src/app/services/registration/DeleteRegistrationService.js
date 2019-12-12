import Registration from '../../Models/Registration';

class DeleteRegistrationService {
  async run({ registrationId }) {
    const registration = await Registration.findByPk(registrationId);

    if (!registration) {
      throw new Error('Matrícula não encontrada.');
    }

    await registration.destroy();

    return true;
  }
}

export default new DeleteRegistrationService();
