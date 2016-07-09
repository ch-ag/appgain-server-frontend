import objectAssign from 'object-assign'

import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'


export default function suitReducer(state = initialState.user_suits, action) {

  switch (action.type) {
    case ActionTypes.LOGIN_START:
      let newstate = Object.assign({}, state, {showProgress: true})
      return newstate

    case ActionTypes.LOGIN_SUCCESS:
      let new_current_user =  Object.assign(
        {}, state, { user_data: action.current_user })
      return Object.assign({}, new_current_user, {showProgress: false})

    // case ActionTypes.LOGIN_FAILD
    //   return Object.assign({}, state, action.loginUser, {showProgress: 0})

    // case ActionTypes.LOGOUT_USER:
    //   return action.logoutUser;

    default:
      return state
  }
}
