export const SET_USER = 'SET_USER';

const initialState = {
  payload: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, payload: { ...action.user } };
    default:
      return state;
  }
};
