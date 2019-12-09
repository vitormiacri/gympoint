import User from '../../Models/User';

class CreateSessionService {
  async run({ email, password }) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!(await user.checkPassword(password))) {
      throw new Error('Password does not match');
    }

    return user;
  }
}

export default new CreateSessionService();
