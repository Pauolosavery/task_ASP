/* eslint-disable no-fallthrough */
/* eslint-disable default-param-last */
import {
  CREATE_USER,
  GET_USERS,
  UPDATE_USER,
  DEL_USER,
  ERROR_USER,
  WEB_API,
} from '../actionTypes/userAT';

const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, users: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case WEB_API:
      return { ...state, webApi: action.payload };
    case UPDATE_USER:
      return { ...state, users: action.payload };
    case DEL_USER:
      return { ...state };
    case ERROR_USER:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
