import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { checkinFailure, checkinSuccess } from './actions';

export function* checkin({ payload }) {
  try {
    const { studentId } = payload;

    const response = yield call(api.post, `students/${studentId}/checkin`);

    const { student_id } = response.data;

    Alert.alert('Bem-vindo!', 'Checkin efetuado com sucesso!');

    yield put(checkinSuccess(student_id));
  } catch (err) {
    Alert.alert('Erro:', `${err.response.data.error}`);
    yield put(checkinFailure());
  }
}
export default all([takeLatest('@student/CHECKIN_REQUEST', checkin)]);
