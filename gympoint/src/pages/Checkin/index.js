/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import { Container, CheckinButton, List } from './styles';

import Header from '~/component/Header';
import api from '~/services/api';
import Checkins from '~/component/Checkins';

function Checkin({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.student.studentId);

  async function loadCheckins() {
    try {
      const response = await api.get(`students/${studentId}/checkin`);

      setCheckins(response.data);
    } catch (err) {
      Alert.alert('Erro', `${err.response.data.error}`);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused]);

  async function handleNewCheckin() {
    try {
      setLoading(true);
      await api.post(`students/${studentId}/checkin`);
      Alert.alert('Sucesso', `Check-in efetuado com sucesso!`);
    } catch (err) {
      Alert.alert('Erro', `${err.response.data.error}`);
    } finally {
      loadCheckins();
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CheckinButton loading={loading} onPress={handleNewCheckin}>
          Novo check-in
        </CheckinButton>
        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <Checkins
              checkin={item}
              index={index}
              totalRows={checkins.length}
            />
          )}
        />
      </Container>
    </>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Checkin);
