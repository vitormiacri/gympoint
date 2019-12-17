import React from 'react';
import { Formik } from 'formik';

import logo from '~/assets/logo.png';
import { Container, Title } from './styles';
import Form from './form';

export default function SignIn() {
  return (
    <Container>
      <img src={logo} alt="Gympoint" />
      <Title>GYMPOINT</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {props => <Form {...props} />}
      </Formik>
    </Container>
  );
}
