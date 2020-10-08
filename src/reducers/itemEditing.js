import * as types from '../constants/ActionTypes';

var initialState = {
  id: '',
  name: '',
  status: false,
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_TASK:
    return action.task;
    case types.CLEAR_TASK:
    state = initialState;
    return state;
    default:
      return state;
  }
};

export default myReducer;
