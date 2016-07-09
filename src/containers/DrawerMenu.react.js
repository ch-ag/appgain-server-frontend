import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import md5 from 'js-md5'

import {blue500, yellow600} from 'material-ui/styles/colors';
import * as Colors from 'material-ui/styles/colors';
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import SVGActionDashboard from 'material-ui/svg-icons/action/dashboard'
import SVGActionViewCarousel from 'material-ui/svg-icons/action/view-carousel'
import SVGImageAdjust from 'material-ui/svg-icons/image/adjust'
import SVGImageLens from 'material-ui/svg-icons/image/lens'
import SVGNavigationApps from 'material-ui/svg-icons/navigation/apps'
import SVGNavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import SVGSocialNotificationsActive from 'material-ui/svg-icons/social/notifications-active'
import SVGSocialPersonOutline from 'material-ui/svg-icons/social/person-outline'

import * as actions from '../actions/AppgainActions'


let SelectableList = MakeSelectable(List)


const window_size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}


const styles = {
  drawer: {
    top: '55px',
    zIndex: 1,
    height: (100 - (55*100)/window_size.height) + '%'
  },

  drawerProfile: {
    bottom: '25px',
    position: 'absolute',
    width: '100%'
  },

  drawerVersion: {
    bottom: '3px',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 13,
    opacity: 0.7,
  },

  listRightCircularProgress:{
    right: 30,
    margin:0
  },

  listLeftCircularProgress: {
    right: 30,
    margin:0
  }
}


class DrawerMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      appsListOpen: true
    }
  }

  render() {
    const {current_user, user_apps, drawerOpen, location,
      router, onNavChange} = this.props

    let drawer_ready = (typeof user_apps === 'object' && user_apps.length > 0)
    let drawer_has_apps = (typeof user_apps === 'object'? user_apps.length : 0 )
    let drawer_items = []
    let drawer_view = location.pathname
    let selected_app = null
    let app_location = null

    const re_app_select = /^\/dashboard\/apps\/([\w\d-_]+)((\/([\w\d-_]+))*)\/?$/
    const has_app_select = re_app_select.exec(drawer_view)
    console.log("has_app_select: ", typeof has_app_select, has_app_select);

    if(has_app_select !== null && drawer_ready){
      drawer_view = '/dashboard/apps/<app-selected>'

      let app_select_id = has_app_select[1]

      app_location = has_app_select[2]

      for(let ndx in user_apps){
        if(user_apps[ndx].id == app_select_id) {
          selected_app = user_apps[ndx]
        }
      }

      console.log('app_select_id', app_select_id);
    }

    let getNameInitials = (name, limit = 3)=>{
      let letters = ''
      let words = name ? name.split() : ''
      words = (words.length === 1) ? name.split('-') : words
      words = (words.length === 1) ? name.split('_') : words
      for(const ndx in words){
        letters += words[ndx][0].toUpperCase()
        if(ndx == (limit-1)) break;
      }

      return letters
    }

    let MenuAvatar = (props) => {
      const color = Colors.deepOrange500
      const bgcolor = Colors.blue500
      const size = 30
      const letters = getNameInitials(props.name)

      return (
        <Avatar
          key={`mv-${letters}`}
          color={props.color || color}
          size={size}
          backgroundColor={props.backgroundColor || bgcolor}
        >
          {props.letters || letters}
        </Avatar>
      )
    }

    let AvatarInitalLetter = (phrase) => {
      let letters = ''
      const name = phrase ? phrase.split() : ''
      for(const ndx in name){
        letters += name[ndx][0]
      }
      return letters
    }

    let UserAvatar = (user) => {
      try {
        return (<Avatar style={{width:40,height:40,margin:5}}  src={`https://www.gravatar.com/avatar/${md5(user.email)}?d=identicon&f=y`} />)
      } catch (e) {
        return null
      }
    }

    let the_current_user = {email: ""}
    if(typeof current_user === 'object' && typeof current_user.email === 'string' ){
      the_current_user = current_user
    }

    const dmi = { //drawer_menu_items
      DASHBOARD: (<ListItem key="dashboard" value="/dashboard" primaryText="Dashboard" leftIcon={<SVGActionDashboard />} />),
      BACK_DASHBOARD: (<ListItem key="dashboard" value="/dashboard" primaryText="Dashboard" leftIcon={<SVGNavigationArrowBack/>} />),
      APPS: (<ListItem key="dashboard-apps" value="/dashboard/apps" primaryText="Apps" leftIcon={<SVGNavigationApps />} />),
      BACK_APPS: (<ListItem key="dashboard-apps" value="/dashboard/apps" primaryText="Apps" leftIcon={<SVGNavigationArrowBack />} />),
      BUSY_APPS: (<ListItem key="dashboard-app-busy" value="#" disabled={true} primaryText="Apps" leftIcon={<SVGNavigationApps />} rightIcon={<CircularProgress style={styles.listLeftCircularProgress} size={0.3}/>} />),
      PROFILE: (<ListItem style={styles.drawerProfile} key="dashboard-profile" value="/dashboard/profile" primaryText="Profile" secondaryText={the_current_user.email} leftIcon={UserAvatar(the_current_user)} />),
      SUPPORT: (<ListItem key="dashboard-support" value="/dashboard/support" primaryText="Support" leftIcon={<SVGSocialPersonOutline />} />),
    }

    let AppAvatar = (app) => {
      const app_initials = getNameInitials(app.title, 2)

      // if(typeof app.app_icon_url === 'string' && app.app_icon_url.length > 10){
      //     return (<Avatar src={app.app_icon_url} />)
      // }

      return (
        <Avatar
          key={`${app.id}-Avatar`}
          backgroundColor={blue500}
          style={{fontSize:20}}
        >
          {app_initials}
        </Avatar>
      )
    }

    switch (drawer_view) {
      case '/dashboard':
        drawer_items = []

        drawer_items.push(dmi.DASHBOARD)
        drawer_items.push(dmi.APPS)
        drawer_items.push(dmi.PROFILE)
        break;
      case '/dashboard/profile':
        drawer_items = []
        drawer_items.push(dmi.BACK_DASHBOARD)
        drawer_items.push(<Divider />)
        // drawer_items.push(dmi.PROFILE)

        break;
      case '/dashboard/apps':
        drawer_items = []
        drawer_items.push(dmi.BACK_DASHBOARD)
        drawer_items.push(<Divider key="divider-dashboard-apps"/>)
        drawer_items.push(<Subheader key="subheader-dashboard-apps">Your Apps</Subheader>)
        if(drawer_ready) {
          user_apps.map((app) => {
            drawer_items.push(
              <ListItem
                key={`${app.id}-ListItem`}
                primaryText={app.title}
                secondaryText={app.web_url}
                value={`/dashboard/apps/${app.id}`}
                leftAvatar={AppAvatar(app)}
                key={"dashboard-apps-"+app.id}
              />
            )
          })
        } else {
          drawer_items.push(dmi.BUSY_APPS)
        }
        break;
      case '/dashboard/apps/<app-selected>':
        drawer_items = []
        drawer_items.push(dmi.BACK_APPS)
        drawer_items.push(<Divider />)
        drawer_items.push(<ListItem
          leftAvatar={AppAvatar(selected_app)}
          value={`/dashboard/apps/${selected_app.id}`}
          primaryText={selected_app.title}
          secondaryText={selected_app.web_url}
        />)
        drawer_items.push(<Divider />)
        drawer_items.push(
          <ListItem
            primaryText="Push"
            secondaryText="Send Push Notification"
            key="dashboard-app-push"
            leftIcon={<SVGSocialNotificationsActive/>}
            value={`/dashboard/apps/${selected_app.id}/push`}
          />
        )

        break;
      default:
        drawer_items = []
        drawer_items.push(dmi.DASHBOARD)
        drawer_items.push(<ListItem key="loading" value="#" disabled={true} leftIcon={<CircularProgress style={styles.listLeftCircularProgress} size={0.3}/>} />)
    }
    //
    drawer_items.push(
      <span style={styles.drawerVersion} key="subheader-version">
        Appgain.io Dashboard v{VERSION}
      </span>
    )


    return (
      <Drawer containerStyle={styles.drawer} open={drawerOpen} zDepth={1}>
        <SelectableList
          router={router}
          onChange={onNavChange}
          value={location.pathname}
        >
          {drawer_items}
        </SelectableList>
      </Drawer>
    )
  }
}


function mapStateToProps(state) {
  return {
    user_suits: state.AppStore.user_suits,
    current_user: state.AppStore.current_user
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
)(DrawerMenu)


// export default DrawerMenu
