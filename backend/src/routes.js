import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import validateSessionStore from './app/validators/sessions/SessionStore';

import StudentController from './app/controllers/StudentController';
import validateStudent from './app/validators/student/StudentCreateAndUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', validateStudent, StudentController.store);
routes.put('/students/:id', validateStudent, StudentController.update);

export default routes;
