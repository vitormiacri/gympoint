import React, { useMemo } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

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
  const dateFormatted = useMemo(() => {
    return question.answer_at
      ? formatRelative(parseISO(question.answer_at), new Date(), {
          locale: pt,
        })
      : formatRelative(parseISO(question.createdAt), new Date(), {
          locale: pt,
        });
  }, [question.answer_at, question.createdAt]);

  return (
    <Container>
      <Card>
        <Info>
          <Title>PERGUNTA</Title>
          <QuestionText>{dateFormatted}</QuestionText>
        </Info>
        <DateText>{question.question}</DateText>
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
