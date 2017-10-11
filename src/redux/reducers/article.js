import {
  RECEIVE_ARTICLES
} from '../constants'


const initialState = {
  articles: {
    dataSource: [],
    byId: {},
    allIds: []
  }
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ARTICLES:
    var rawArticlesData = action.data
    var byId = {};
    var allIds = [];

    rawArticlesData.forEach((article) => {
      byId[article._id] = article
      allIds.push(article._id)
    })

    return Object.assign({}, state, {
      articles: {
        dataSource: rawArticlesData,
        byId: byId,
        allIds: allIds
      }
    })

    default:
    return state
  }
  return state
}
