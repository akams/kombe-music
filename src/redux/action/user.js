import { SET_USER } from '../reducers/user/user';

function setUsersList(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function dispatchSetUsers(user) {
  return dispatch => {
    dispatch(setUsersList(user));
  };
}