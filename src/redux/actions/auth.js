import {
  USER_LOGGEDIN,
  USER_LOGGEDOUT,
  USER_LOGIN_FAIL,
  USER_SET_AVATAR,
  DATA_USER_LOGGEDOUT
} from '../constants'

import {
  API_SERVER
} from '../../globalConfig'

import axios from 'axios'
import configureStore from '../store';
const { store } = configureStore

export function login(email, password) {
  let url = `${API_SERVER}/public/login`
  return function (dispatch) {
    return axios.post(url, {email, password})
    .then(function (response) {
      if (response.data.success) {
        dispatch({
          type: USER_LOGGEDIN,
          data: response.data
        })
      }
    })
    .catch(error => {
      dispatch({
        type: USER_LOGIN_FAIL,
        data: error.response
      })
    });
  }
}

export function updateAvatar(avatar_url) {
  let url = `${API_SERVER}/protect/profile/avatar`;
  let TOKEN = store.getState().auth.token
  return function (dispatch) {
    return fetch(url, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: avatar_url
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        dispatch({
          type: USER_SET_AVATAR,
          avatar: avatar_url
        })
      }
    })
    .catch(error => {
      console.log(error)
    });
  }
}

const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

export const logout = () => {
  return dispatch => {
    return delay().then(() => {
      dispatch({
        type: USER_LOGGEDOUT
      })
      dispatch({
        type: DATA_USER_LOGGEDOUT
      })
    });
  }
}
