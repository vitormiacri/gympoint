import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import {
  Container,
  LogoTitle,
  ContainerHeader,
  Form,
  FormInput,
  SubmitButton,
} from './styles';
import logo from '~/assets/logo.png';
import api from '~/services/api';

export default function New() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.student.studentId);

  async function handleSubmit() {
    try {
      if (question) {
        setLoading(true);
        await api.post(`questions/${studentId}`, {
          question,
        });
        setQuestion('');
        Alert.alert('Sucesso', 'Em breve responderemos seu pedido de auxílio!');
      } else {
        Alert.alert('Erro', 'Informe a sua dúvida!');
      }
    } catch (err) {
      Alert.alert('Erro', `${err.response.data.error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form>
        <View>
          <FormInput
            placeholder="Inclua seu pedido de ajuda"
            autoCapitalize="none"
            returnKeyType="send"
            multiline
            numberOfLines={10}
            value={question}
            onChangeText={setQuestion}
          />
        </View>
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Enviar pedido
        </SubmitButton>
      </Form>
    </Container>
  );
}
New.navigationOptions = ({ navigation }) => ({
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
