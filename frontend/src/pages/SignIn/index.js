import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';
import { Container, Title } from './styles';
import Form from './form';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="Gympoint" />
      <Title>GYMPOINT</Title>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={{ email: '', password: '' }}
        validateOnChange={false}
        validateOnBlur={false}
        loading={loading}
      >
        {props => <Form {...props} />}
      </Formik>
    </Container>
  );
}
