import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import { persistStore, persistCombineReducers } from 'redux-persist'
import auth from './auth'
import tool from './tool'
import article from './article'
import data from './data'
// import { NavigationActions } from "react-navigation";
// import AppNavigator from '../../AppNavigator'
//
// console.log(AppNavigator.router.getActionForPathAndParams('guidemap'))
//
// const initialState = AppNavigator.router.getStateForAction({type: "Navigation/NAVIGATE", routeName: "guidemap"});
// console.log(initialState)
// const navReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);
//
//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };

const config = {
  key: 'root',
  storage,
}

const reducers = persistCombineReducers(config, {
  tool,
  auth,
  article,
  data
})

export default reducers
