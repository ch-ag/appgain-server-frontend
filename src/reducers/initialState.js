import {loadState} from '../store/localStore'

const {user_creds, current_user} = loadState()

export default {
  user_creds,
  current_user,
  user_suits: [],
  showProgress: false
}
