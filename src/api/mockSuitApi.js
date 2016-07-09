import delay from './delay';
import UserApi from './mockUserApi'
// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const APP_SUITS = [
  {
    id: "f5e354dbfa695734adde1f38",
    title: "LnkStore",
    home: "http://www.LnkStore.net",
    apps: {
      parse: "83e1d4ae5f5465fdd3abf739",
      smart_link: null,
      raich_paegs: null
    }
  },
  {
    id: "574ad3de1ffdbfa835465e39",
    title: "Appgain",
    home: "http://www.appgain.co",
    apps: {
      parse: "dde1fd3abf74ae5835465f39",
      smart_link: null,
      raich_paegs: null
    }
  },
  {
    id: "34ad354dbfa857693de1ff5e",
    title: "iKhair",
    home: "http://www.ikhair.net",
    apps: {
      parse: "e5f8fdd3abf31d394654ae57",
      smart_link: null,
      raich_paegs: null
    }
  }
];

const PARSE_APPS = [
    {
        id: 'f5e354dbfa695734adde1f38',
        server_cfg: {
            serverUrl: 'https://134.243.546.242:24536/',
            appId: 'A111111',
            masterKey: 'M111111',
            rest_key: 'R1111111'
        }
    },
    {
        id: '574ad3de1ffdbfa835465e39',
        server_cfg: {
            serverUrl: 'https://134.243.546.242:32453/',
            appId: 'A2222222',
            masterKey: 'M2222222',
            rest_key: 'R2222222'
        }
    },
    {
        id: '34ad354dbfa857693de1ff5e',
        server_cfg: {
            serverUrl: 'https://134.243.546.242:32453/',
            appId: 'A333333333',
            masterKey: 'M333333333',
            rest_key: 'R333333333'
        }
    },
]

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class SuitApi {

  static fetchUserSuits(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user_suit_lst = []
        // console.log("SuitApi::getUserSuits");
        for(var i in user.suits){
          // console.log("SuitApi::getUserSuits::Q>>", user.suits[i]);
          for(var j in APP_SUITS){
            // console.log("SuitApi::getUserSuits::L>>", APP_SUITS[j].id);
            if(user.suits[i] === APP_SUITS[j].id){
              // console.log("SuitApi::getUserSuits:: Match");
              user_suit_lst.push(APP_SUITS[j])
              // console.log("SuitApi::getUserSuits:: lst ", user_suit_lst);
            }
          }
        }

        resolve(Object.assign([], user_suit_lst));
      }, delay);
    });
  }

  static getParseApp(parse_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        sel_app = null

        for(var parse_app in PARSE_APPS){
          if(parse_app.id === parse_id){
            sel_app = Object.assign({}, parse_app)
            break;
          }
        }

        if(sel_app !== null){
          resolve(Object.assign({}, sel_app));
        } else {
          reject("app not found")
        }


      }, delay);
    });
  }

  static sendPushNotification(user_creds, app_id, push_data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        const current_user = UserApi.loginUser(user_creds)
        .then( (current_user) => {
          const user_suits = SuitApi.fetchUserSuits(current_user)
            .then( (current_user) => {
              let pus_sent = false
              for(let idx in user_suits){
                let app = user_suits[idx]
                if(app.id === app_id){
                  pus_sent = true
                }
              }

              if(pus_sent){
                resolve( {
                  status: "Success",
                  message: "push sent"
                })
              } else {
                reject({
                  status: "error",
                  message: "fiald to send push"
                })
              }
            })
            .catch( (error) => {
              reject({
                status: "error",
                message: "suit not found or don't have permission"
              })
            })
        })
        .catch( (error) => {
          reject({
            status: "not authorized",
            message: "wronge username/password"
          })
        })

      }, delay);
    });
  }


}

export default SuitApi;
