/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Alert } from 'react-native';
import { Container, QuestionButton, QuestionsList } from './styles';
import Header from '~/component/Header';
import api from '~/services/api';
import Questions from '~/component/Questions';

export default function List({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.student.studentId);

  async function loadQuestions() {
    try {
      setLoading(true);
      const response = await api.get(`questions/${studentId}`);

      setQuestions(response.data);
    } catch (err) {
      Alert.alert('Erro', `${err.response.data.error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
