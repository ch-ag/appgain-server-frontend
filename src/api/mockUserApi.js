import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const USERS = [
  {
    id: 'ag-demo-1',
    email: 'demo@appgain.io',
    password: '123456@Aa',
    "suits": [
        "574ad3de1ffdbfa835465e39",
        "34ad354dbfa857693de1ff5e",
        "f5e354dbfa695734adde1f38",
    ]
  },
  {
    id: 'ag-demo-2',
    email: 'demo2@appgain.io',
    password: '654321@Aa',
    "suits": [
        "34ad354dbfa857693de1ff5e"
    ]
  },
  {
    id: 'ag-demo-3',
    email: 'demo3@appgain.io',
    password: '123456@Aa',
    "suits": [
        "f5e354dbfa695734adde1f38",
    ]
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (user) => {
  return user.email.toLowerCase().split("@")[0];
};

const demoUser = {'email': "demo@appgain.io"}

class UserApi {

  static loginUser(user_creds = demoUser ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let login_user = null
        for(var ndx in USERS) {
          var usr = USERS[ndx]
          if(usr.email === user_creds.email) {
            console.log('usr', usr);
            login_user = Object.assign({}, usr)
            resolve(login_user);
            break;
          }
        }

        if(login_user === null){
          reject('Faild to login');
        }
      }, delay);
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minUserNameLength = 3;
        if (user.firstName.length < minUserNameLength) {
          reject(`First Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.lastName.length < minUserNameLength) {
          reject(`Last Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.id) {
          const existingUserIndex = users.findIndex(a => a.id == user.id);
          users.splice(existingUserIndex, 1, user);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new users in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          user.id = generateId(user);
          USERS.push(user);
        }

        resolve(Object.assign({}, user));
      }, delay);
    });
  }


}

export default UserApi;
