/* eslint-disable import/prefer-default-export */
import {
  CREATE_USER,
  GET_USERS,
  UPDATE_USER,
  DEL_USER,
  ERROR_USER,
  WEB_API,
} from '../actionTypes/userAT';

export function createUserAC(payload) {
  return {
    type: CREATE_USER,
    payload,
  };
}

export function getUsersAC(payload) {
  return {
    type: GET_USERS,
    payload,
  };
}
export function getWepApi(payload) {
  return {
    type: WEB_API,
    payload,
  };
}
export function delUser(payload) {
  return {
    type: DEL_USER,
    payload,
  };
}

export function updateUserData(payload) {
  return {
    type: UPDATE_USER,
    payload,
  };
}

export function errorUserAC(payload) {
  return {
    type: ERROR_USER,
    payload,
  };
}
