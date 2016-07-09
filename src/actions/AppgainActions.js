import * as ActionTypes from './actionTypes'
import {getFromLocalState, saveToLcoalState} from '../store/localStore'


export function loadLocalState() {
  return {
    type: 'LOAD_LOCAL_STATE',
    localstate: {
      user_creds: getFromLocalState('user_creds'),
      current_user: getFromLocalState('current_user'),
      user_suits: getFromLocalState('user_suits')
    }
  }
}

//////////////////////////////////////////////
// User
//



export function loginStart(user_creds) {
  saveToLcoalState({user_creds})
  return {
    type: ActionTypes.LOGIN_START,
    user_creds,
    // showProgress: true
  };
}

export function loginSuccess(current_user) {
  saveToLcoalState({current_user})

  console.log('Action: loginSuccess: current_user:', current_user);

  return {
    type: ActionTypes.LOGIN_SUCCESS,
    current_user,
    // showProgress: true
  }
}

export function loginFaild(error) {
  saveToLcoalState({user_creds: null, current_user:null})
  return {
    type: ActionTypes.LOGIN_FAILD,
    current_user: null,
    error,
    // showProgress: true
  };
}

export function logoutUser(error) {
  saveToLcoalState({user_creds: null, current_user:null})
  return {
    type: ActionTypes.LOGOUT_USER,
    current_user: null,
    user_creds: null,
    error,
    // showProgress: true
  };
}

// export function loginUser() {
//   return function(dispatch) {
//     return UserApi.loginUser().then(current_user => {
//         dispatch(loginSuccess(current_user))
//     }).catch( (error) => {
//         throw(error)
//     })
//   }
// }

//////////////////////////////////////////////
// Suits
//

export function suitsFetchStart(current_user) {
  return {
    type: ActionTypes.SUIT_FETCH_START,
    // current_user,
    showProgress: true
  }
}

export function suitsFetchSuccess(user_suits) {
  console.log("suitsFetchSuccess(user_suits)", user_suits);
  return {
    type: ActionTypes.SUIT_FETCH_SUCCESS,
    user_suits,
    suits_fetch_error: null,
    showProgress: false
  }
}

export function suitsFetchFaild(error) {
  return {
    type: ActionTypes.SUIT_FETCH_FAILD,
    user_suits: null,
    suits_fetch_error: error,
    showProgress: false
  }
}
