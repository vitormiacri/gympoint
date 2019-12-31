import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Answered = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const AnsweredText = styled.Text`
  color: ${props => (props.answered ? '#42cb59' : '#999')};
  font-size: 14px;
  margin-left: 10px;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #999;
`;

export const QuestionText = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 15px;
`;
