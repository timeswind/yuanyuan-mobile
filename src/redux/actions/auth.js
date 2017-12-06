import {
  USER_LOGGEDIN,
  USER_LOGGEDOUT,
  USER_LOGIN_FAIL,
  DATA_USER_LOGGEDOUT
} from '../constants'

import {
  API_SERVER
} from '../../globalConfig'

import axios from 'axios'

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
