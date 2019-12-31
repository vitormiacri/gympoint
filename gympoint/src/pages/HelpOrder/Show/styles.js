import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 20px;
  background: #f2f2f2;
  flex: 1;
`;

export const Card = styled.View`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
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

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const QuestionText = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 20px;
`;

export const Answer = styled.View`
  margin-top: 30px;
`;
