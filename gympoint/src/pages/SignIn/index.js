import React, { useState } from 'react';
import { Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { checkinRequest } from '~/store/modules/student/actions';
import logo from '~/assets/logo.png';

import { Container, LogoTitle, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const [studentId, setStudentId] = useState();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.student.loading);

  function handleSubmit() {
    dispatch(checkinRequest(studentId));
  }

  return (
    <Container>
      <Image source={logo} />
      <LogoTitle>GYMPOINT</LogoTitle>
      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          value={studentId}
          onChangeText={setStudentId}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
