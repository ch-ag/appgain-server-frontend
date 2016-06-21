import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Formsy from 'formsy-react'
import SvgIconError from 'material-ui/svg-icons/alert/error';
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
// import {FormsyCheckbox, FormsyDate} from 'formsy-material-ui/lib'
// import {FormsyRadioGroup, FormsySelect} from 'formsy-material-ui/lib'
// import {FormsyTime, FormsyToggle, FormsyRadio} from 'formsy-material-ui/lib'
import {FormsyText} from 'formsy-material-ui/lib'
import Snackbar from 'material-ui/Snackbar'

import * as actions from '../actions/AppgainActions'
// import UserApi from '../api/mockUserApi'
import UserApi from '../api/UserApi'

const errorMessages = {
  emailError: "Please valid email address",
  securePsswdError: "Password Must Have Minimum 8 characters "+
  "with 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character",
}

const styles = {
  paperStyle: {
    width: 330,
    margin: 'auto',
    padding: 20,
    marginTop: '25vh'
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
  }
}

class LoginPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      canSubmit: false,
      showBusy: false
    }

    // this.props.login_started = false
    this.submitForm = this.submitForm.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
  }

  componentWillMount() {

    const {location} = this.props

    console.log('>> LoginPage: location.pathname', location.pathname);

    if(location.pathname === '/logout'){
      console.log('>> loging out');
      this.props.actions.logoutUser()
      this.context.router.push('/login')
    }



  }

  enableButton() {
  }

  disableButton() {
  }

  submitForm(login_data) {
    console.info("AppLogin  submitForm: ", login_data)

    this.props.actions.loginStart(login_data)

    let loginuser = UserApi.loginUser(login_data)
      .then( (respond) => {
          this.props.actions.loginSuccess(respond.body)
          this.context.router.push('/dashboard')
      })
      .catch( (error) => {
          throw(error)
          this.props.actions.loginFaild(error)
      })

    console.log('loginuser: ', loginuser);
  }

  notifyFormError(data) {
    console.error('Form error:', data)
  }

  // validate() {
  //   const value = this.getValue();
  //   console.log(value, this.state.validationType);
  //   return value ? validators[this.state.validationType].regexp.test(value) : true;
  // }
  //
  // getCustomErrorMessage() {
  //   return this.showError() ? validators[this.state.validationType].message : '';
  // }
  //

  render() {
    let {paperStyle, submitStyle, submitSpinner} = styles
    let {emailError, securePsswdError} = errorMessages
    let isSecurePsswd = {
      matchRegexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
    }

    const has_lowercase = {matchRegexp: /^(?=.*[a-z])/}
    const has_uppercase = {matchRegexp: /^(?=.*[A-Z])/}
    const has_digits = {matchRegexp: /^(?=.*\d)/}
    const has_symbols = {matchRegexp: /^(?=.*[$@$!%*?&])/}
    const has_len_min8 = {matchRegexp: /^[A-Za-z\d$@$!%*?&]{8,}/}

    const is_secure_password = {
      has_lowercase: {
        regexp: /^(?=.*[a-z])$/,
        message: 'Must have at least one lowercase Letter'
      },
      has_uppercase: {
        regexp: /^(?=.*[A-Z])$/,
        message: 'Must have at least one Uppercase Letter'
      },
      has_digits: {
        regexp: /^(?=.*\d)$/,
        message: 'Must have at least one Number'
      },
      has_symbols: {
        regexp: /^(?=.*[$@$!%*?&])$/,
        message: 'Must have at least one Symbol (=.*@$!%*?&)'
      },
      has_len_min8: {
        regexp: /^[A-Za-z\d$@$!%*?&]{8,}$/,
        message: 'Minimum 8 characters'
      }
    }

    //TODO:
    let login_faild = false
    let login_faild_msg = null


    // if (this.state.showBusy === true) {
    //   return (
    //     <div style={submitSpinner}>
    //       <CircularProgress  size={2} />
    //     </div>
    //   )
    // }
    // else {
      return (
        <div>
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
          >
            <Card style={paperStyle}>
              <CardTitle title="Login Appgain.io" />
              <CardText>
                <FormsyText
                  required
                  name="email"
                  validations="isEmail"
                  validationError={emailError}
                  hintText="login email"
                  floatingLabelText="email"
                  //value="test@test.com"
                />
                <FormsyText
                  required
                  name="password"
                  type="password"
                  //validations={isSecurePsswd}
                  //validationError={securePsswdError}
                  hintText="strong password"
                  floatingLabelText="Password"
                  //value="123"
                />
              </CardText>
              <CardActions>
                <RaisedButton
                  style={submitStyle}
                  type="submit"
                  name="login"
                  label="Login"
                  primary={true}
                />
              </CardActions>
            </Card>
          </Formsy.Form>
          <Snackbar
            open={login_faild}
            message={login_faild_msg || <span><SvgIconError color={"#fff"}/>&nbsp;&nbsp;Login faild check your login creadintals</span>}
            autoHideDuration={9000}
            bodyStyle={{
              backgroundColor:'#d50000',
              fontFamily:"Roboto, sans-serif"
            }}
          />
        </div>
      )
    // } // else closing
  }
}

// LoginPage.propTypes = {
//   actions: PropTypes.object.isRequired,
//   fuelSavings: PropTypes.object.isRequired
// }

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
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
)(LoginPage)

// export default LoginPage
