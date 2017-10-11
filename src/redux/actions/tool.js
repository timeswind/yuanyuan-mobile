import {
  RECEIVE_EXCHANGE_RATE
} from '../constants'

export function fetchExchangeRate() {
  let url = 'http://api.fixer.io/latest?base=USD';
  return function (dispatch) {
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: RECEIVE_EXCHANGE_RATE,
          data: responseJson
        })
      })
      .catch((error) => console.error(error))
  }
}
