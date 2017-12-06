import {
  FETCH_AVAILABLE_CARDS_SUCCESS,
  FETCH_OWNED_CARDS_SUCCESS,
  REGISTER_CARD_SUCCESS,
  DEREGISTER_CARD_SUCCESS,
  DATA_USER_LOGGEDOUT
} from '../constants'


const initialState = {
  availableCards: {
    byId: {},
    allIds: [],
    ownedIds: []
  },
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case FETCH_AVAILABLE_CARDS_SUCCESS:
    if (action.cards && action.cards.length > 0) {
      return fetchAvailableCardsSuccess(action.cards, state)
    } else {
      return state
    }

    case FETCH_OWNED_CARDS_SUCCESS:
    if (action.cards && action.cards.length > 0) {
      return fetchOwnedCardsSuccess(action.cards, state)
    } else {
      return state
    }

    case REGISTER_CARD_SUCCESS:
    if (action.card) {
      return registerCardSuccess(action.card, state)
    } else {
      return state
    }

    case DEREGISTER_CARD_SUCCESS:
    if (action.card) {
      return deregisterCardSuccess(action.card, state)
    } else {
      return state
    }

    case DATA_USER_LOGGEDOUT:
      return initialState

    default:
    return state
  }
  return state
}

function fetchAvailableCardsSuccess(rawCardsData, state) {
  var byId = {};
  var allIds = new Set();
  var ownedIds = [];

  rawCardsData.forEach((card, index) => {
    if ('image' in card && card['image'].indexOf("yuanyuanofficial.s3.amazonaws.com") >= 0) {
      card['image'] = card['image'].replace("yuanyuanofficial.s3.amazonaws.com", "yuanyuan.imgix.net") + "?w=600"
    }
    card['owned'] = false
    byId[card._id] = card
    allIds.add(card._id)
  })
  return updateObject(state, {
    availableCards: {
      byId: byId,
      allIds: Array.from(allIds),
      ownedIds: Array.from(ownedIds)
    }
  })
}

function fetchOwnedCardsSuccess(rawCardsData, state) {
  var byId = state.availableCards.byId;
  var allIds = new Set(state.availableCards.allIds);
  var ownedIds = new Set(state.availableCards.ownedIds);
  rawCardsData.forEach((card, index) => {
    const cardTemplateID = card['template']['_id']
    if ('template' in card && 'image' in card['template'] && card['template']['image'].indexOf("yuanyuanofficial.s3.amazonaws.com") >= 0) {
      card['template']['image'] = card['template']['image'].replace("yuanyuanofficial.s3.amazonaws.com", "yuanyuan.imgix.net") + "?w=600"
    }
    card["template"]["disable"] = card["disable"]
    card["template"]["owned"] = true
    card["template"]["number"] = card["number"]
    card["template"]["cardId"] = card["_id"]
    byId[cardTemplateID] = card["template"]
    allIds.add(cardTemplateID)
    if (card["disable"] === true) {
      // card is disabled
    } else {
      ownedIds.add(cardTemplateID)
    }
  })

  return updateObject(state, {
    availableCards: {
      byId: byId,
      allIds: Array.from(allIds),
      ownedIds: Array.from(ownedIds)
    }
  })
}

function registerCardSuccess(card, state) {
  var byId = state.availableCards.byId;
  var allIds = new Set(state.availableCards.allIds);
  var ownedIds = new Set(state.availableCards.ownedIds);
  console.log(card)
  const cardTemplateID = card['template']
  byId[cardTemplateID]["owned"] = true
  byId[cardTemplateID]["number"] = card["number"]
  byId[cardTemplateID]["disable"] = false
  byId[cardTemplateID]["cardId"] = card["_id"]
  ownedIds.add(cardTemplateID)
  return updateObject(state, {
    availableCards: {
      byId: byId,
      allIds: Array.from(allIds),
      ownedIds: Array.from(ownedIds)
    }
  })
}

function deregisterCardSuccess(card, state) {
  var byId = state.availableCards.byId;
  var allIds = new Set(state.availableCards.allIds);
  var ownedIds = new Set(state.availableCards.ownedIds);
  console.log(card)
  const cardTemplateID = card['template']
  byId[cardTemplateID]["owned"] = true
  byId[cardTemplateID]["number"] = card["number"]
  byId[cardTemplateID]["disable"] = true
  byId[cardTemplateID]["cardId"] = card["_id"]
  ownedIds.add(cardTemplateID)
  return updateObject(state, {
    availableCards: {
      byId: byId,
      allIds: Array.from(allIds),
      ownedIds: Array.from(ownedIds)
    }
  })
}

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}
