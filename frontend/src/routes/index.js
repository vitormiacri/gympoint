import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import StudentsForm from '../pages/Students/Form';
import Plans from '../pages/Plans';
import PlansForm from '../pages/Plans/Form';
import Registrations from '../pages/Registrations';
import RegistrationsForm from '../pages/Registrations/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/new" exact component={StudentsForm} isPrivate />
      <Route path="/students/edit" exact component={StudentsForm} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/new" exact component={PlansForm} isPrivate />
      <Route path="/plans/edit" exact component={PlansForm} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/new"
        exact
        component={RegistrationsForm}
        isPrivate
      />
      <Route
        path="/registrations/edit"
        exact
        component={RegistrationsForm}
        isPrivate
      />
    </Switch>
  );
}
