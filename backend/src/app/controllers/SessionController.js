import jwt from 'jsonwebtoken';

import auth from '../../config/auth';
import CreateSessionService from '../services/session/CreateSessionService';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await CreateSessionService.run({
      email,
      password,
    });

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
