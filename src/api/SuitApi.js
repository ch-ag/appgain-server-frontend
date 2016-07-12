import superagent from 'superagent'
import {API_HOST} from '../constants/appgainConstants'
import UserApi from './UserApi'

class SuitApi {

  static fetchUserSuits(discarded, suit_id) {
    const user_creds = UserApi.getLoggedUserCreds()

    console.debug('SuitApi fetchUserSuits user_creds:', user_creds);

    return superagent.get(`${API_HOST}/apps/`)
                     .auth(user_creds.email, user_creds.password)
  }

  static sendPushNotification(discarded, suit_id, push_data) {
    const user_creds = UserApi.getLoggedUserCreds()

    const {push_message, push_link,
      push_badge_inc, push_time} = push_data

    let push_req = {
      method: 'post',
      endpoint: '/push',
      payload: {
        where: {},
        data: {
          alert: push_message,
          url: push_link
        }
      }
    }

    if(push_badge_inc){
      push_req.payload.data.badge = 'Increment'
    }

    if(push_time){
      // push_req.payload.push_time = push_time
      push_req.scheded_push = push_time
    }

    console.log("push_req:", push_req);

    if(push_time){
      return superagent.post(`${API_HOST}/scheduled_push/${suit_id}`)
                       .auth(user_creds.email, user_creds.password)
                       .send(push_req)
    }

    return superagent.post(`${API_HOST}/apps/${suit_id}/parse/fw`)
                     .auth(user_creds.email, user_creds.password)
                     .send(push_req)
  }

  static upsertSuit(suit_data) {
    const user_creds = UserApi.getLoggedUserCreds()

    console.group('SuitApi upsertSuit')

    if( suit_data.id ){
      console.debug('update suit suit_data:', suit_data);
      return superagent.put(`${API_HOST}/apps/${suit_data.id}`)
                       .auth(user_creds.email, user_creds.password)
    } else {
      console.debug('create new suit suit_data:', suit_data);
      return superagent.post(`${API_HOST}/apps/`)
                       .auth(user_creds.email, user_creds.password)
    }
    console.groupEnd()

  }
}

export default SuitApi
