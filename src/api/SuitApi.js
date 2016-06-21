import superagent from 'superagent'
import {API_HOST} from '../constants/appgainConstants'


class SuitApi {

  static fetchUserSuits(user_creds, suit_id) {
    return superagent.get(`${API_HOST}/apps/`
    ).auth(user_creds.email, user_creds.password)
  }

  static sendPushNotification(user_creds, suit_id, push_data) {

    const {push_message, push_link,
      push_badge_inc, push_time} = push_data

    let push_req = {
      method: 'post',
      endpoint: '/push/1',
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
      push_req.payload.push_time = push_time
    }

    console.log("push_req:", push_req);

    return superagent.post(
      `${API_HOST}/apps/${suit_id}/parse/fw`
    ).auth(
      user_creds.email, user_creds.password
    ).send(push_req)

  }


}

export default SuitApi;
