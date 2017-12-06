import {
  FETCH_AVAILABLE_CARDS_SUCCESS,
  FETCH_OWNED_CARDS_SUCCESS,
  REGISTER_CARD_SUCCESS,
  DEREGISTER_CARD_SUCCESS
} from '../constants'

import {
  API_SERVER
} from '../../globalConfig'

import configureStore from '../store';
const { store } = configureStore

export function fetchAvailableCards(school) {
  let url = `${API_SERVER}/public/available_cards?school=${school}`
  return function (dispatch) {
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: FETCH_AVAILABLE_CARDS_SUCCESS,
        cards: responseJson.cards
      })
    })
    .catch((error) => console.error(error))
  }
}

// export function fetchCardTemplate(id) {
//   let url = `${API_SERVER}/public/cardtemplate`
//   return function (dispatch) {
//     return fetch(url)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       console.log(responseJson)
//       dispatch({
//         type: FETCH_AVAILABLE_CARDS_SUCCESS,
//         card: responseJson.cards
//       })
//     })
//     .catch((error) => console.error(error))
//   }
// }

export function fetchOwnedCards() {
  let url = `${API_SERVER}/protect/cards/mine`
  let TOKEN = store.getState().auth.token
  return function (dispatch) {
    return fetch(url, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: FETCH_OWNED_CARDS_SUCCESS,
        cards: responseJson.cards
      })
    })
    .catch((error) => console.error(error))
  }
}

export function RegisterCard(id) {
  let url = `${API_SERVER}/protect/register_card?id=${id}`
  let TOKEN = store.getState().auth.token
  return function (dispatch) {
    return fetch(url, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: REGISTER_CARD_SUCCESS,
        card: responseJson.card
      })
    })
    .catch((error) => console.error(error))
  }
}

export function deregisteredCard(id) {
  let url = `${API_SERVER}/protect/deregister_card?id=${id}`
  let TOKEN = store.getState().auth.token
  return function (dispatch) {
    return fetch(url, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + TOKEN
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: DEREGISTER_CARD_SUCCESS,
        card: responseJson.card
      })
    })
    .catch((error) => console.error(error))
  }
}
