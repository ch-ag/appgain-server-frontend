import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {List, ListItem, MakeSelectable} from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import SVGActionDashboard from 'material-ui/svg-icons/action/dashboard'
import SVGActionViewCarousel from 'material-ui/svg-icons/action/view-carousel'
import SVGNavigationApps from 'material-ui/svg-icons/navigation/apps'
import SVGSocialPersonOutline from 'material-ui/svg-icons/social/person-outline'
// import Subheader from 'material-ui/Subheader'
import * as actions from '../actions/AppgainActions'

function wrapState(ComposedComponent) {
  class SelectableList extends React.Component {
    componentWillMount() {
      console.log("SelectableList componentWillMount");
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange(event, index) {
      console.log("SelectableList handleRequestChange");
      this.setState({
        selectedIndex: index,
      });
    }

    render() {
      return (
        <ComposedComponent
          className="adf"
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  }

  SelectableList.propTypes = {
    children: PropTypes.node.isRequired,
    defaultValue: PropTypes.number.isRequired,
  };

  return SelectableList
}

let SelectableList = wrapState(MakeSelectable(List));

const window_size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

const styles = {
  drawer: {
    top: '65px',
    height: (100 - (64*100)/window_size.height) + '%'
  }
}


class DrawerMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      appsListOpen: true
    }

    console.log("MainDrawer constructor(props)")
    // this.drawerMenuItems = this.drawerMenuItems.bind(this)
  }

  // drawerMenuItems() {
  //   for (var menu_item in this.props.drawer_menu_items) {
  //     console.log("drawer_menu_items", menu_item)
  //     // return (
  //     //   <ListItem index={menu_item.label} primaryText={menu_item.label} />
  //     // )
  //   }
  //   const label = "drawer_menu_items"
  //   return ( <li>{label}</li>)
  // }

  render() {
    console.info("AppDrawer render", this.state)
    // const label = "drawer_menu_items"
    // const drawer_menu_items = this.props.drawer_menu_items
    const {user_apps, drawerOpen} = this.props

    return (
      <Drawer containerStyle={styles.drawer} open={drawerOpen}>
        <SelectableList defaultValue={0}>
          <ListItem disabled={false} primaryText="Dashboard" leftIcon={<SVGActionDashboard />} />
          <ListItem
            primaryText="Apps"
            initiallyOpen={true}
            primaryTogglesNestedList={true}
            value={"apps-0"}
            leftIcon={<SVGNavigationApps />}
            nestedItems={user_apps.map((app)=>{
              return (
                <ListItem
                  key={app.id}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  value={"app-"+app.id}
                  primaryText={app.title}
                  leftIcon={<SVGActionViewCarousel />}
                  onTouchTap={(e)=>{
                    console.log("user_apps ListItem: ", e);
                  }}
                />
              )
            })}
          />
        <ListItem disabled={false} primaryText="Profile" leftIcon={<SVGSocialPersonOutline />} />
        </SelectableList>
      </Drawer>
    )
  }
}


// {[
//   <ListItem
//     key={1}
//     primaryText="iKhair"
//     leftIcon={<SVGActionViewCarousel />}
//   />,
//   <ListItem
//     key={2}
//     primaryText="LnkStore"
//     leftIcon={<SVGActionViewCarousel />}
//   />
// ]}

function mapStateToProps(state) {
  return {
    user_suits: state.user_suits
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
