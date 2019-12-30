export function checkinRequest(studentId) {
  return {
    type: '@student/CHECKIN_REQUEST',
    payload: { studentId },
  };
}

export function checkinSuccess(studentId) {
  return {
    type: '@student/CHECKIN_SUCCESS',
    payload: { studentId },
  };
}

export function checkinFailure() {
  return {
    type: '@student/CHECKIN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@student/SIGN_OUT',
  };
}
