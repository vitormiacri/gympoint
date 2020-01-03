import styled from 'styled-components/native';
import Input from '~/component/Input';
import Button from '~/component/Button';

export const Container = styled.SafeAreaView`
  padding: 20px;
  background: #f2f2f2;
  flex: 1;
`;

export const ContainerHeader = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LogoTitle = styled.Text`
  color: #ee4e62;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  justify-content: flex-start;
  text-align: auto;
  height: 250px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
