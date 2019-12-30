import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  loading: false,
  studentId: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/CHECKIN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/CHECKIN_SUCCESS': {
        draft.studentId = action.payload.studentId;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@student/CHECKIN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@student/SIGN_OUT': {
        draft.studentId = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
