import React from 'react'
import { Route, IndexRoute } from 'react-router'

import WellcomePage from './components/WellcomePage.react'
import AboutPage from './components/AboutPage.react'
import NotFoundPage from './components/NotFoundPage.react'
import LandingPage from './components/LandingPage.react'
import ProfilePage from './components/ProfilePage.react'
import AppPage from './components/AppPage.react'

import App from './containers/App.react'
import Dashboard from './containers/Dashboard.react'
import LoginPage from './containers/LoginPage.react'
import PushComposePanel from './containers/PushComposePanel.react'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="logout" component={LoginPage}/>

    <Route path="dashboard" component={Dashboard} >
      <IndexRoute component={WellcomePage} />
      <Route path="profile" component={ProfilePage} />
      <Route path="support" component={AboutPage} />
      <Route path="apps" component={AppPage} />
      <Route path="apps/:app_id">
        <IndexRoute component={AppPage} />
        <Route path="push" component={PushComposePanel}/>
      </Route>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
)
