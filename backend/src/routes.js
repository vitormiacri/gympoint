import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import validateSessionStore from './app/validators/sessions/SessionStore';

import StudentController from './app/controllers/StudentController';
import validateStudent from './app/validators/student/StudentCreateAndUpdate';

import PlanController from './app/controllers/PlanController';
import validatePlan from './app/validators/plan/PlanCreateAndUpdate';

import RegistrationController from './app/controllers/RegistrationController';
import validateRegistration from './app/validators/registration/RegistrationCreateAndUpdate';

import CheckinController from './app/controllers/CheckinController';

import QuestionController from './app/controllers/QuestionController';
import validateQuestion from './app/validators/question/QuestionCreate';

import HelpOrderController from './app/controllers/HelpOrderController';
import validateHelpOrder from './app/validators/helporder/HelpOrderUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.post('/students/:student_id/checkin', CheckinController.store);
routes.get('/students/:student_id/checkin', CheckinController.index);

routes.get('/questions/:student_id', QuestionController.index);
routes.post(
  '/questions/:student_id',
  validateQuestion,
  QuestionController.store
);

routes.use(authMiddleware);

routes.get('/help-orders', HelpOrderController.index);
routes.put('/help-orders/:id', validateHelpOrder, HelpOrderController.update);

routes.post('/students', validateStudent, StudentController.store);
routes.put('/students/:id', validateStudent, StudentController.update);
routes.delete('/students/:id', StudentController.delete);
routes.get('/students', StudentController.index);

routes.post('/plans', validatePlan, PlanController.store);
routes.put('/plans/:id', validatePlan, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
routes.get('/plans', PlanController.index);

routes.post(
  '/registrations',
  validateRegistration,
  RegistrationController.store
);
routes.put(
  '/registrations/:id',
  validateRegistration,
  RegistrationController.update
);
routes.delete('/registrations/:id', RegistrationController.delete);
routes.get('/registrations', RegistrationController.index);

export default routes;
