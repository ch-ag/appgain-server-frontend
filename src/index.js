/* eslint-disable import/default */

import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import routes from './routes'
import configureStore from './store/configureStore'
import {loadState, saveState} from './store/localStore'

const lightMuiTheme = getMuiTheme(lightBaseTheme)



require('./favicon.ico') // Tell webpack to load favicon.ico

const store = configureStore()
injectTapEventPlugin();

// store.subscribe(()=>{
//   saveState({
//     user_creds: store.getState().AppStore.user_creds
//   })
// })

render(
  <MuiThemeProvider muiTheme={lightMuiTheme}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>, document.getElementById('app')
)
