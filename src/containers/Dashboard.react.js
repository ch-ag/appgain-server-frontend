import React, { PropTypes } from 'react'
// import { Link, IndexLink } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import {NAV_ROUTES} from '../constants/appgainConstants'
import AppBody from '../components/AppBody.react'
import DrawerMenu from './DrawerMenu.react'
import * as actions from '../actions/AppgainActions'
// import SuitApi from '../api/mockSuitApi'
import SuitApi from '../api/SuitApi'

const styles = {
  buttonGroup: {
    marginTop: '5px'
  },

  button: {
    color: '#fff'
  }

}

class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      usrSuits: null,
      drawerOpen: true
    }

    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleNavChangeList = this.handleNavChangeList.bind(this)
    this.handleUserLogout = this.handleUserLogout.bind(this)
  }

  componentWillMount() {
    console.log("this.props.store: ", this.props.store);

    const {current_user, user_suits} = this.props

    console.log("DASHBOARD:user_suits", user_suits)

    if(
      user_suits === undefined ||
      user_suits === null ||
      user_suits.length === 0
    ){
      console.log('>> Dashboard will redirect to /dashboard');
      this.context.router.push('/dashboard')
    }

    if(current_user === undefined || current_user === null){
      console.log('>> Dashboard will redirect to /login');
      this.context.router.push('/login')
    } else {
      this.fetchSuits()
    }


  }

  fetchSuits() {
    console.info("Dashboard  fetchSuits")
    const {current_user} = this.props

    if(current_user !== undefined || current_user !== null){

      console.info("!> Dashboard  fetchSuits user:", current_user.email)

      this.props.actions.suitsFetchStart(current_user)

      let usr_suits_lst = SuitApi.fetchUserSuits(current_user)
        .then( (respond) => {
            this.props.actions.suitsFetchSuccess(respond.body.user_suits)
        })
        .catch( (error) => {
            throw(error)
            this.props.actions.suitsFetchFaild(error)
        })

      console.log('usr_suits_lst: ', usr_suits_lst);
    }
  }

  getUserSuits(){
    return this.props.user_suits
  }

  toggleDrawer(event) {
    console.log("<< toggleDrawer", event);
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  handleUserLogout() {
    console.log("LOGOUT <<<<<<<<<<<<<<");
    this.props.actions.logoutUser()
    this.context.router.push('/login')
  }

  handleNavChangeList(event, value) {
    console.log(">>> handleNavChangeList", value);
    this.context.router.push(value);
    this.setState({
      navDrawerOpen: false,
    });
  }

  render() {

    const {location} = this.props

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.toggleDrawer}
          title={<span>Appgain.io</span>}
          iconElementRight={
            <div style={styles.buttonGroup}>
              <FlatButton
                label="Home"
                linkButton={true}
                style={styles.button}
                href={NAV_ROUTES.HOME}
              />
              <FlatButton
                label="Dashboard"
                linkButton={true}
                style={styles.button}
                href={NAV_ROUTES.DASHBOARD}
              />
              <FlatButton
                label="Help"
                linkButton={true}
                style={styles.button}
                href={NAV_ROUTES.HELP}
              />
              <FlatButton
                label="Logout"
                linkButton={true}
                style={styles.button}
                href={NAV_ROUTES.LOGOUT}
              />
            </div>
          }
        />
      <DrawerMenu
        drawerOpen={this.state.drawerOpen}
        user_apps={this.getUserSuits()}
        router={this.context.router}
        onNavChange={this.handleNavChangeList}
        location={location}
      />
      <AppBody>
        {this.props.children}
      </AppBody>
    </div>
    )
  }
}

Dashboard.propTypes = {
  children: PropTypes.element
}

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    store: state,
    current_user: state.AppStore.current_user,
    user_suits: state.AppStore.user_suits,
    showProgress: state.AppStore.showProgress
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
