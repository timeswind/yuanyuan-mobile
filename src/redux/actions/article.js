import {
  RECEIVE_ARTICLES
} from '../constants'

import {
  API_SERVER
} from '../../globalConfig'

export function fetchArticles() {
  let url = `${API_SERVER}/public/articles`
  return function (dispatch) {
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success) {
          dispatch({
            type: RECEIVE_ARTICLES,
            data: responseJson.articles
          })
        }
      })
      .catch((error) => console.error(error))
  }
}
