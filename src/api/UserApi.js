import superagent from 'superagent'
import {API_HOST, API_ENDPOINTS} from '../constants/appgainConstants'
import {getFromLocalState} from '../store/localStore'

class UserApi {

  static getLoggedUserCreds(){
    const user_creds = getFromLocalState('user_creds')

    console.debug('UserApi getLoggedUserCred: ', user_creds);

    return user_creds
  }

  static loginUser(discarded) {

    const user_creds = UserApi.getLoggedUserCreds()

    return superagent.get(API_HOST+API_ENDPOINTS.login)
                     .auth(user_creds.email, user_creds.password)
  }

  static createUser(user) {
    return user
  }
}

export default UserApi;
