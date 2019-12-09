import User from '../Models/User';

class UserController {
  async index(req, res) {
    const allUsers = await User.findAll();

    return res.json(allUsers);
  }
}

export default new UserController();
