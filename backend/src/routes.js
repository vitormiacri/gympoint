import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import validateSessionStore from './app/validators/sessions/SessionStore';

import StudentController from './app/controllers/StudentController';
import validateStudent from './app/validators/student/StudentCreateAndUpdate';

import PlanController from './app/controllers/PlanController';
import validatePlan from './app/validators/plan/PlanCreateAndUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', validateStudent, StudentController.store);
routes.put('/students/:id', validateStudent, StudentController.update);

routes.post('/plans', validatePlan, PlanController.store);
routes.put('/plans/:id', validatePlan, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
routes.get('/plans', PlanController.index);

export default routes;
