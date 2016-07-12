import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router'

import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton';

import SvgAlertError from 'material-ui/svg-icons/alert/error';
import SvgImageEdit  from 'material-ui/svg-icons/Image/edit'
import SVGNavigationClose from 'material-ui/svg-icons/navigation/close'

import Formsy from 'formsy-react'
import {FormsyCheckbox, FormsyDate} from 'formsy-material-ui/lib'
import {FormsyRadioGroup, FormsySelect} from 'formsy-material-ui/lib'
import {FormsyTime, FormsyToggle, FormsyRadio} from 'formsy-material-ui/lib'
import {FormsyText} from 'formsy-material-ui/lib'

import {NAV_ROUTES} from '../constants/appgainConstants'
import SuitApi from '../api/SuitApi'
import * as actions from '../actions/AppgainActions'


const errorMessages = {
  emailError: "Please valid email address",
  securePsswdError: "Password Must Have Minimum 8 characters "+
      "with 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character",
}


const styles = {
  paperStyle: {
    //width: 330,
    margin: 'auto',
    padding: 20,
    marginTop: '2vh',
    marginLeft: '2vw'
  },

  input: {
    marginRight: 50
  },

  switchStyle: {
    marginBottom: 16
  },

  submitStyle: {
    marginTop: 32
  },

  submitSpinner: {
    marginTop: '25vh',
    marginLeft: '45vw'
  },

  LinearProgress: {
    backgroundColor:'#fff'
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


class SuitPanel extends React.Component {

  constructor(props) {
    console.group('SuitPanel: constructor')
    super(props)

    const {user_suits} = props
    const {app_id} = props.params

    console.debug('>> app_id', app_id)
    console.debug('>> user_suits', user_suits)

    let current_suit = undefined
    // get current suit by id form user suits
    for(var ndx in user_suits) {
      if(app_id == user_suits[ndx].id){
        current_suit = user_suits[ndx]
        console.debug('>> found suit', current_suit)
        break
      }
    }

    console.debug('>> current_suit', current_suit)

    this.state = {
      canSubmit: false,
      showBusy: false,
      current_suit
    }

    // this.props.login_started = false
    this.submitForm = this.submitForm.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)

    console.groupEnd()
  }

  componentWillReceiveProps(newProps) {
    console.group('SuitPanel: componentWillReceiveProps')

    const {user_suits} = newProps
    const {app_id} = newProps.params

    console.debug('>> app_id', app_id)
    console.debug('>> user_suits', user_suits)

    let current_suit = undefined
    // get current suit by id form user suits
    for(var ndx in user_suits) {
      if(app_id == user_suits[ndx].id){
        current_suit = user_suits[ndx]
        console.debug('>> found suit', current_suit)
        break
      }
    }

    console.debug('>> current_suit', current_suit)

    this.setState({
      current_suit
    })

    console.groupEnd()
  }

  shouldComponentUpdate(nextProps, nextState){
    return true
  }

  enableButton() { }

  disableButton() { }

  submitForm(f) {
    console.info("SuitPanel submitForm: ", f)

    const {current_suit} = this.state
    let suit_data = current_suit ? current_suit : {}
    suit_data.name = f.suit_name
    suit_data.web_url = f.suit_website
    suit_data.icon_url = f.suit_icon_url
    suit_data.release_type = f.suit_release_status
    suit_data.apple_store_id = f.suit_apple_store_id
    suit_data.google_play_id = f.suit_google_play_id
    suit_data.apple_deep_link_prefix = f.suit_apple_deep_link_prefix
    suit_data.android_deep_link_prefix = f.suit_android_deep_link_prefix

    console.debug('SuitPanel submitForm: suit_data:', suit_data)

    let update_suit = SuitApi.upsertSuit(suit_data)
      .then( (res) => {
        this.updateSuitSuccess(res)
      })
      .catch( (err) => {
        this.updateSuitFaild(err)
      })
    this.updateSuitStart()
  }

  updateSuitStart(){
    console.log('updateSuitStart: ')
  }

  updateSuitSuccess(res){
    console.log('updateSuitSuccess: ', res)
  }

  updateSuitFaild(err){
    console.log('updateSuitFaild: ', err)
  }

  notifyFormError(data) {
    console.error('Form error:', data)
  }

  render() {
    const {paperStyle, submitStyle, submitSpinner} = styles
    const {emailError, securePsswdError} = errorMessages

    let {current_suit, release_status} = this.state

    const {params} = this.props

    console.log('----- route params', params, params.app_id)

    return (
      <div>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
        >
          <Card style={paperStyle}>
            <CardTitle title={
                current_suit ? 'Edit App' : (<span>
                  <Link to={NAV_ROUTES.DASHBOARD}>
                    <IconButton
                      href={NAV_ROUTES.DASHBOARD}
                      style={{width: 60,height: 60}}
                    >
                      <SVGNavigationClose/>
                    </IconButton>
                  </Link>

                  Create New App
                </span>)} />
            <CardText>

              <FormsyText
                required
                name="suit_name"
                floatingLabelText="App Name"
                value={current_suit ? current_suit.name : ''}
                style={styles.input}
              />

              <FormsyText
                required
                name="suit_icon_url"
                floatingLabelText="App Icon URL"
                value={current_suit ? current_suit.app_icon_url : ''}
              /> <br/>

              <FormsyText
                required
                name="suit_website"
                floatingLabelText="App Website"
                value={current_suit ? current_suit.web_url : ''}
                style={styles.input}
              /> <br/>

              <FormsyText
                required
                name="suit_apple_deep_link_prefix"
                floatingLabelText="Apple Deeplink Prefix"
                value={current_suit ? current_suit.suit_apple_deep_link_prefix : ''}
                style={styles.input}
              />

              <FormsyText
                required
                name="suit_android_deep_link_prefix"
                floatingLabelText="Android Deeplink Prefix"
                value={current_suit ? current_suit.android_deep_link_prefix : ''}
              /> <br/>

              <FormsyText
                required
                name="suit_apple_store_id"
                floatingLabelText="Apple Store Id"
                value={current_suit ? current_suit.apple_store_id : ''}
                style={styles.input}
              />

              <FormsyText
                required
                name="suit_google_play_id"
                floatingLabelText="Google Play Id"
                value={current_suit ? current_suit.google_play_id : ''}
              /> <br/>

              <FormsySelect
                required
                value={current_suit ? current_suit.release_type : ''}
                name="suit_release_status"
                floatingLabelText="Release Status"
                floatingLabelFixed={true}
              >
                <MenuItem key={1} value="development" primaryText="Development" />
                <MenuItem key={2} value="testing" primaryText="Testing" />
                <MenuItem key={3} value="statging" primaryText="Statging" />
                <MenuItem key={4} value="production" primaryText="Production" />
              </FormsySelect>
            </CardText>
            <CardActions>
              <RaisedButton
                style={submitStyle}
                type="submit"
                name="save_suit"
                label={current_suit ? "Save": "Create"}
                primary={true}
              />
            </CardActions>
          </Card>
        </Formsy.Form>
      </div>
    )
  }
}

// SuitPanel.propTypes = {
//   actions: PropTypes.object.isRequired,
// }

SuitPanel.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {

  const {current_user, user_suits} = state.AppStore

  return {
    current_user,
    user_suits
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
)(SuitPanel)
