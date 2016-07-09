import React, { PropTypes } from 'react'
// import { Link, IndexLink } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as colors from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress'
// import AppBar from 'material-ui/AppBar'
// import FlatButton from 'material-ui/FlatButton'
// import CircularProgress from 'material-ui/CircularProgress'


import * as actions from '../actions/AppgainActions'

const styles = {
  LinearProgress: {
    backgroundColor:'transparent',
    position: 'absolute',
    zIndex: '10000',
    top: 0
  },

  CircularProgress: {
    background:'transparent'
  },

  Progress: {
    background: 'transparent',
    position: 'absolute',
    width: '100vw',
    zIndex: '10000000000'
  }

}

// const Progress = (props) => {
//   return (
//     <div style={styles.Progress}>
//       <LinearProgress mode="indeterminate" color="cyan" style={styles.LinearProgress}/>
//       <CircularProgress style={styles.CircularProgress}/>
//     </div>
//   )
// }



class App extends React.Component {

  constructor(props) {
    super(props)

    // this.state = {
    //   showBusy: true
    // }

    this.props.actions.loadLocalState()

  }

  render() {

    const { showProgress } = this.props
    // const showProgress = true

    return (
      <div>
        {showProgress && <LinearProgress
          mode="indeterminate"
          color={colors.tealA400}
          style={styles.LinearProgress}
        />}
        {this.props.children}
    </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

function mapStateToProps(state) {

  console.log("AppStore state:", state);

  return {
    showProgress: state.AppStore.showProgress
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
