import React, { PropTypes } from 'react'
// import { Link, IndexLink } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

import * as Colors from 'material-ui/styles/colors';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import {FormsyText, FormsyToggle} from 'formsy-material-ui/lib'
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import Formsy from 'formsy-react'
import LinearProgress from 'material-ui/LinearProgress'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Snackbar from 'material-ui/Snackbar'
import SVGAlertWarning from 'material-ui/svg-icons/Alert/warning'
import SVGActionDate  from 'material-ui/svg-icons/Action/date-range'
import SVGActionDone from 'material-ui/svg-icons/Action/done'
import SVGNotifications from 'material-ui/svg-icons/Social/notifications'
import SVGPoll from 'material-ui/svg-icons/Social/poll'
import SVGSocialNotificationsActive from 'material-ui/svg-icons/social/notifications-active'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


import * as actions from '../actions/AppgainActions'
// import SuitApi from '../api/mockSuitApi'
import SuitApi from '../api/SuitApi'
// import PushPreview from '../components/PushPreview/PushPreview.react'

const styles = {
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

class ParseSechueler extends React.Component {

  constructor(props) {
    super(props)

    const minDate = moment.utc().toDate()
    const maxDate = moment.utc().add(2, 'weeks').toDate()

    this.state = {
      date: minDate,
      time: minDate,
      tz: true,
      minDate,
      maxDate
    }

    this.handleTzToggle = this.handleTzToggle.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }

  handleTzToggle() {
    const tz = !this.state.tz
    this.setState({
      tz
    })

    if(typeof this.props.onTzChange === 'function'){
      this.props.onTzChange(null, tz)
    }

    if(typeof this.props.onChange === 'function'){
      this.props.onChange(null, Object.assign(
        {},
        this.state,
        {tz}
      ))
    }
  }

  handleDateChange(event, date){
    this.setState({
      date
    })

    if(typeof this.props.onDateChange === 'function'){
      this.props.onDateChange(event, date)
    }

    if(typeof this.props.onChange === 'function'){
      this.props.onChange(null, Object.assign(
        {},
        this.state,
        {date}
      ))
    }
  }

  handleTimeChange(event, time){
    this.setState({
      time
    })

    if(typeof this.props.onTimeChange === 'function'){
      this.props.onTimeChange(event, time)
    }

    if(typeof this.props.onChange === 'function'){
      this.props.onChange(null, Object.assign(
        {},
        this.state,
        {time}
      ))
    }
  }

  render(){

    const {date, time, tz,
      minDate, maxDate} = this.state

    return (
      <div style={{marginLeft:0}}>
        <br/>
        <Toggle
          name="tz"
          label="Respect User Time Zone?"
          style={{width:250}}
          onToggle={this.handleTzToggle}
          defaultToggled={true}
          labelStyle={{color:(tz?Colors.grey900:Colors.pink800)}}
        />
        <DatePicker
          onChange={this.handleDateChange}
          floatingLabelText={this.props.floatingLabelText}
          defaultDate={minDate}
          minDate={minDate}
          maxDate={maxDate}
          disableYearSelection={true}
        />
        <TimePicker
          format="24hr"
          hintText={this.props.timeHintText}
          onChange={this.handleTimeChange}
        />
      </div>
    )
  }
}


const ParseAppInitialState = {
  push_submit_disabled: false,
  push_clear_disabled: false,
  push_message_chars: 100,
  push_badge_inc: false,
  push_status: null,
  push_scheded: false,
  push_time: null,
  push_tz: null,
  selected_app: null
}

class ParseApp extends React.Component {

  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.pushMessageCount = this.pushMessageCount.bind(this)
    this.handelAppBadgeToggle = this.handelAppBadgeToggle.bind(this)
    this.sendPushStart = this.sendPushStart.bind(this)
    this.sendPushSuccess = this.sendPushSuccess.bind(this)
    this.sendPushFaild = this.sendPushFaild.bind(this)
    this.togglePushScheded = this.togglePushScheded.bind(this)
    this.handleParseSechueler = this.handleParseSechueler.bind(this)
    this.resetForm = this.resetForm.bind(this)

    ParseAppInitialState.selected_app = this.getSelectedApp()
    this.state = Object.assign(
      {},
      ParseAppInitialState
    )
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      selected_app: this.getSelectedApp()
    })
  }

  getSelectedApp() {
    const {location, user_suits} = this.props

    let selected_app_id = null
    let selected_app = null
    let app_location = null

    const re_app_select = /^\/dashboard\/apps\/([\w\d-_]+)((\/([\w\d-_]+))*)\/?$/
    const has_app_select = re_app_select.exec(location.pathname)

    if(has_app_select !== null && user_suits) {
      selected_app_id = has_app_select[1]
      app_location = has_app_select[2]

      for(let ndx in user_suits){
        if(user_suits[ndx].id == selected_app_id){
          selected_app = user_suits[ndx]
        }
      }
    }

    return selected_app
  }

  resetForm() {
    console.log("<<resetForm>>", this.refs)

    const selected_app = this.state
    this.setState(
      Object.assign({}, ParseAppInitialState, {selected_app})
    );
    console.log("<<resetForm>>", ParseAppInitialState)
  }

  togglePushScheded() {
    this.setState({
      push_scheded: !this.state.push_scheded
    })
  }

  handleParseSechueler(event, state) {
    console.log("handleParseSechueler: ", state);
    const {date, time, tz} = state

    // 2015-08-022T12:00:00.000Z
    const date_m = moment(date).format("YYYY-MM-DD");
    const time_m = moment(time).format("HH:mm:ss");
    const tz_m = moment(time).format("Z");
    const push_time = `${date_m}T${time_m}${tz ? tz_m: ''}`

    this.setState({
      push_time,
      push_tz: tz,
    })

    console.log("handleParseSechueler: ", push_time);
  }


  pushMessageCount(data){
    const char_count = data.target.value.length
    console.log("pushMessageCount", char_count)
    let push_message_chars = 100 - char_count

    let push_message = null

    if(push_message_chars <= -1){
      push_message = `Too Long remove ${char_count-100} characters, Message should not exceed 100 characters`
    } else {
      push_message = null
    }

    this.refs.push_form.updateInputsWithError({
      push_message
    });

    this.setState({
      push_message_chars
    })

  }

  enableButton() {
  }

  disableButton() {
  }

  sendPushStart() {
    console.log('sendPush Started')
    this.setState({
      push_submit_disabled: true,
      push_clear_disabled: true,
      push_status: 'loading'
    })
  }

  sendPushSuccess(){
    console.log('sendPush Success')
    this.setState({
      push_submit_disabled: false,
      push_clear_disabled: false,
      push_status: 'success'
    })
  }

  sendPushFaild(){
    console.log('sendPush Faild')
    this.setState({
      push_submit_disabled: false,
      push_clear_disabled: false,
      push_status: 'faild'
    })
  }

  submitForm(form_data) {
    console.info("Push Form  submit raw_data: ", form_data)
    console.log("push_inc: ", this.refs.push_inc.state.switched);

    // const {push_badge_inc} = this.state
    const push_badge_inc = this.refs.push_inc.state.switched
    const {push_tz, push_time} = this.state

    let push_data = Object.assign(
      {},
      form_data,
      {push_badge_inc}
    )

    if(push_tz){
      push_data.push_time = push_time
    }

    const {user_creds} = this.props
    const {selected_app} = this.state


    let loginuser = SuitApi.sendPushNotification(user_creds, selected_app.id, push_data)
      .then( (login_user) => {
        this.sendPushSuccess(login_user)
      })
      .catch( (error) => {
        this.sendPushFaild(error)
      })
    this.sendPushStart()

    console.info("Push Form  submit send_data: ", push_data)
  }

  handelAppBadgeToggle() {
    console.log("!this.state.push_badge_inc: ", !this.state.push_badge_inc);
    // this.setState({
    //   push_badge_inc:
    // })
  }

  notifyFormError(data) {
    console.error('Form error:', data)
  }

  render() {

    const { showProgress } = this.props
    const paperStyle = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block'
    }


    const {push_message_chars, selected_app, push_status,
      push_submit_disabled, push_clear_disabled, push_scheded} = this.state
    const is_uri = {
      matchRegexp: /^(\w+:\/\/)([\da-z\.-]+)?\.?([\/\w \.-]*)*\/?$/
    }

    let PushStatusSnackbar = (push_status) => {
      switch (push_status) {
        case 'loading':
          return (
            <Snackbar
              open={true}
              message={
                <span>
                  <CircularProgress size={0.5}/>
                  <span style={{top:'-20px',position:'relative'}}>
                    Sending Push
                  </span>
                </span>
              }
            />
          )
          break;
        case 'success':
          return (
            <Snackbar
              open={true}
              message={
                <span>
                  <SVGActionDone
                    style={{marginBottom:'-11px', width:30, height:30}}
                    color={Colors.green500}
                    viewBox="0 0 30 30"/>
                  <span >
                    Push Sent
                  </span>
                </span>
              }
            />
          )
          break;
        case 'faild':
          return (
            <Snackbar
              open={true}
              message={
                <span>
                  <SVGAlertWarning
                    style={{marginBottom:'-11px', width:30, height:30}}
                    color={Colors.red500}
                    viewBox="0 0 30 30"/>
                  <span >
                    Faild to Send Push, try agin later.
                  </span>
                </span>
              }
            />
          )
          break;
        default:
          return null
      }
    }
    // {push_loading && <RefreshIndicator left={15} top={4} size={40} status="loading"/>}
    // <RaisedButton
    //  style={{marginLeft: push_loading ? 60 : 0}}


    return (
      <Formsy.Form
        ref="push_form"
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
        onInvalidSubmit={this.notifyFormError}
      >
        <Card style={{marginLeft:'30px',width:'400px'}}>
          <CardTitle
            title={<span><SVGSocialNotificationsActive/>&nbsp;&nbsp;Push Notification</span>}
            subtitle={`Send Push Notification for ${selected_app.title} Users`} />
          <CardText >
            <h4>Write your message</h4>
            <p>The best campaigns use short and direct messaging.</p>
            <FormsyText
              required
              ref="push_message"
              name="push_message"
              validations={{
                minLength:2,
                maxLength:100
              }}
              validationErrors={{
                minLength:"This message is too short",
                maxLength:"Too Long, Message should not exceed 100 characters"
              }}
              style={{width:350}}
              hintText="Type your message.... (Max 100 characters)"
              floatingLabelText={`What would you like to say? (${push_message_chars})`}
              onChange={this.pushMessageCount}
              multiLine={true}
              rows={2}
              errorText="adgafgea"
            />
            <br/>
            <FormsyText
              ref="push_link"
              name="push_link"
              validations={is_uri}
              validationError="this not a valid deeplink, Valid Url is required `appname://path/to/content`"
              hintText={`Deep link... (${selected_app.apple_deep_link_prefix}path/to/content)`}
              style={{width:350}}
              floatingLabelText="Where to direct users?"
            />
            <br/><br/><br/>
            <Toggle
              ref="push_inc"
              name="push_badge_inc"
              label="Increment the app badge?"
              style={{width:250}}
            />
            <br/>
            <Toggle
              disabled
              ref="push_scheded_toggle"
              name="push_scheded_toggle"
              label="Scheduled Push?"
              style={{width:250}}
              onToggle={this.togglePushScheded}
            />
          { push_scheded && <ParseSechueler
                onChange={this.handleParseSechueler}
                floatingLabelText="Set Push schedule"
                timeHintText="Set Time"
              />
            }
          </CardText>
          <CardActions >
            {PushStatusSnackbar(push_status)}
            <RaisedButton
              disabled={push_submit_disabled}
              //primary={true}
              backgroundColor={push_scheded ? Colors.indigo500: Colors.cyan500}
              labelColor="#fff"
              type="submit"
              icon={push_scheded && <SVGActionDate/>}
              label={push_scheded ? 'Scheduled Push': 'Send Push'}
            />
          </CardActions>
        </Card>
      </Formsy.Form>
    )
  }
}

ParseApp.propTypes = {
  children: PropTypes.element,
  user_suits: PropTypes.object.isRequired
}

function mapStateToProps(state) {

  console.log("AppStore state:", state);

  return {
    showProgress: state.AppStore.showProgress,
    user_suits: state.AppStore.user_suits,
    user_creds: state.AppStore.user_creds
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
)(ParseApp)


//
// <PushPreview
//   app_name=''
//   audience={false}
//   pushState={{
//     audience_id:'everyone',
//     data:'', // previewMessage
//     data_type: 'message',
//     exp_enable: false,
//     exp_size_in_percent: null,
//     exp_type: null,
//     experiment_name:null,
//     // expiration_interval_num,
//     // expiration_interval_unit,
//     // expiration_time,
//     // expiration_time_type,
//     increment_badge: true,
//     local_time : 'UTC',
//     push_expires: false,
//     push_time_iso: false,
//     // push_time_type
// }}/>
///
