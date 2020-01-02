import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Info,
  Answered,
  AnsweredText,
  DateText,
  QuestionText,
} from './styles';

export default function Questions({ question, handleOnPress }) {
  return (
    <Container onPress={handleOnPress}>
      <Info accessible>
        <Answered>
          <Icon
            name="check-circle"
            size={16}
            color={question.answer_at ? '#42cb59' : '#999'}
          />
          <AnsweredText answered={!!question.answer_at}>
            {question.answer ? 'Respondido' : 'Sem resposta'}
          </AnsweredText>
        </Answered>
        <DateText>{question.dateFormatted}</DateText>
      </Info>
      <QuestionText>{question.question}</QuestionText>
    </Container>
  );
}
Questions.propTypes = {
  question: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleOnPress: PropTypes.func.isRequired,
};
