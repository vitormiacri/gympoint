import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Input from '~/component/Input';
import Button from '~/component/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #fff;

  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const LogoTitle = styled.Text`
  color: #ee4e62;
  font-size: 27px;
  font-weight: bold;
  margin-top: 10px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
