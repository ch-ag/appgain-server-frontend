import superagent from 'superagent'
import {API_HOST, API_ENDPOINTS} from '../constants/appgainConstants'

class UserApi {

  static loginUser(user_creds) {
    return superagent.get(
      API_HOST+API_ENDPOINTS.login
    ).auth(user_creds.email, user_creds.password)
  }

  static createUser(user) {
    return user
  }
}

export default UserApi;
