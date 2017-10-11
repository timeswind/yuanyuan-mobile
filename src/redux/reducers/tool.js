import {
  RECEIVE_EXCHANGE_RATE
} from '../constants'

const initialState = {
  exchangeRates: {},
  USDtoCNYrate: 0
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_EXCHANGE_RATE:
    return Object.assign({}, state, {
      exchangeRates: action.data,
      USDtoCNYrate: action.data.rates["CNY"]
    })
    default:
    return state
  }
  return state
}
