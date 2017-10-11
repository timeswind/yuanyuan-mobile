import {
  LOGIN,
  USER_LOGGEDIN,
  USER_LOGGEDOUT
} from '../constants'

import {
  API_SERVER
} from '../../globalConfig'

import axios from 'axios'

export function login(email, password) {
  console.log(JSON.stringify({
    email,
    password
  }))
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
    });
  }
}
