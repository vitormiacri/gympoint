import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ContainerHeader,
  LogoTitle,
  Info,
  Title,
  DateText,
  QuestionText,
  Text,
  Answer,
  Card,
} from './styles';
import logo from '~/assets/logo.png';

export default function Show({ navigation }) {
  const question = navigation.getParam('question');

  return (
    <Container>
      <Card>
        <Info>
          <Title>PERGUNTA</Title>
          <DateText>{question.dateFormatted}</DateText>
        </Info>
        <QuestionText>{question.question}</QuestionText>
        <Answer>
          <Title>RESPOSTA</Title>
          <Text>{question.answer}</Text>
        </Answer>
      </Card>
    </Container>
  );
}

Show.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
  headerTitle: () => (
    <ContainerHeader>
      <Image source={logo} style={{ width: 36, height: 18 }} />
      <LogoTitle>GYMPOINT</LogoTitle>
    </ContainerHeader>
  ),
});
