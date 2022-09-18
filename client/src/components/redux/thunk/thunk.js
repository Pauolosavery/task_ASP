/* eslint-disable no-unused-vars */
import {
  createUserAC, delUser, errorUserAC, getUsersAC, getWepApi, updateUserData,
} from '../actionCreators/userAC';

export const fetchGetUsers = () => (dispatch) => {
  fetch('/personal/list')
    .then((res) => res.json())
    .then((data) => dispatch(getUsersAC(data)))
    .catch((err) => dispatch(errorUserAC(err)));
  fetch('/se8xcjl879apvmu')
    .then((res) => res.json())
    .then((data) => dispatch(getWepApi(data)))
    .catch((err) => dispatch(errorUserAC(err)));
};

export const fetchCreateUser = (body) => (dispatch) => {
  fetch('/personal/list', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(() => dispatch(fetchGetUsers()))
    .catch((err) => dispatch(errorUserAC(err)));
};

export const fetchUpdateUser = (body) => (dispatch) => {
  fetch('/personal/list', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => dispatch(fetchGetUsers()))
    .catch((err) => dispatch(errorUserAC(err)));
};

export const fetchUserDel = (body) => (dispatch) => {
  fetch('/personal/list', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => dispatch(fetchGetUsers()))
    .catch((err) => dispatch(errorUserAC(err)));
};
