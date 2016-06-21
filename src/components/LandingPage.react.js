import React from 'react'
import {Link} from 'react-router'

import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'


// import DrawerMenu from './containers/DrawerMenu.react.js'


const LandingPage = () => {

  const styles = {
    header: {
      width: "100vw",
      textAlign: "center"
    }
  }

  return (
      <div style={styles.header}>
        <h1>Appgain.io<small><sub>Beta</sub></small></h1>
        <Link to="/dashboard">Dashboard</Link>
      </div>
  )
}

export default LandingPage
