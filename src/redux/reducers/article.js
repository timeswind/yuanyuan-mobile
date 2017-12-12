import {
  RECEIVE_ARTICLES
} from '../constants'

import urlParse from 'url-parse';

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
      if (article.cover) {
        var coverUrl = new urlParse(article.cover);
        console.log(coverUrl)
        var modifiedURL = coverUrl.origin + coverUrl.pathname + '?w=200&h=160'
        article.cover = modifiedURL
      }
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
