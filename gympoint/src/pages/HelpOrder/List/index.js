/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { Container, QuestionButton, QuestionsList } from './styles';
import Header from '~/component/Header';
import api from '~/services/api';
import Questions from '~/component/Questions';

function List({ navigation, isFocused }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.student.studentId);

  async function loadQuestions() {
    try {
      setLoading(true);
      const response = await api.get(`questions/${studentId}`);

      setQuestions(
        response.data.map(item => ({
          ...item,
          dateFormatted: formatRelative(parseISO(item.createdAt), new Date(), {
            locale: pt,
          }),
        }))
      );
    } catch (err) {
      Alert.alert('Erro', `${err.response.data.error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadQuestions();
    }
    loadQuestions();
  }, []);

  function handleNewQuestion() {
    navigation.navigate('New');
  }

  return (
    <Container>
      <QuestionButton onPress={handleNewQuestion}>Pedir auxílio</QuestionButton>
      <QuestionsList
        data={questions}
        keyExtractor={item => String(item.id)}
        refreshing={loading}
        renderItem={({ item: question }) => (
          <Questions
            question={question}
            handleOnPress={() => navigation.navigate('Show', { question })}
          />
        )}
      />
    </Container>
  );
}

List.navigationOptions = ({ navigation }) => ({
  header: <Header navigation={navigation} />,
});

export default withNavigationFocus(List);
