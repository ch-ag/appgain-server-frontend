import objectAssign from 'object-assign'

import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'


export default function userLoginReducer(state = initialState, action) {

  console.log("userLoginReducer: ", action);
  switch (action.type) {
    case ActionTypes.LOAD_LOCAL_STATE:
      return Object.assign(
        {},
        state,
        action.localstate,
        {showProgress: false}
      )
    case ActionTypes.LOGIN_START:
      return Object.assign(
        {},
        state,
        {user_creds: action.user_creds},
        {showProgress: true}
      )
    case ActionTypes.LOGIN_SUCCESS:

      return Object.assign(
        {},
        state,
        {current_user: action.current_user},
        {showProgress: false},
        {DumyShit: "Adgdg"}
      )
    // case ActionTypes.LOGIN_FAILD
    //   return Object.assign({}, state, action.loginUser, {showProgress: 0})
    // case ActionTypes.LOGOUT_USER:
    //   return action.logoutUser;

    case ActionTypes.SUIT_FETCH_START:
      let newstate = Object.assign({}, state, {showProgress: true})
      return newstate

    case ActionTypes.SUIT_FETCH_SUCCESS:
      let new_current_user =  Object.assign(
        {}, state, { user_suits: action.user_suits })
      return Object.assign({}, new_current_user, {showProgress: false})

    default:
      return state
  }
}
