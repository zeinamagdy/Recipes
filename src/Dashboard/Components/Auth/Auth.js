import React, { useRef, useEffect, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import Button from '../../../common/UI/Button/Button'
import classes from './Auth.module.css'
import * as Routes from '../../../common/constants/routes'



const Login = (props) => {
  const email = useRef('')
  const password = useRef('')
  const { isAuthicated, authRedirectpath, setAuthRedirectPath } = props
  useEffect(() => {
    if (isAuthicated && authRedirectpath !== '/')
      setAuthRedirectPath();
  }, [isAuthicated, authRedirectpath, setAuthRedirectPath])

  const login = (event) => {
    event.preventDefault()
    console.log('email', email.current.value)
    props.onAuth(email.current.value, password.current.value)
  }
  let form = (<div className={classes.auth}>
    <form className={classes.auth_form} onSubmit={(e) => login(e)}>
      <span className={classes.auth_Header}>Login</span>
      <input
        className={classes.auth_input}
        type="email"
        placeholder='Email' ref={email} />
      <input
        className={classes.auth_input}
        type='password'
        placeholder='password' ref={password} />
      <Button btnType="primary">Login</Button>
      <div className={classes.singup}>
        <span>Don't Have an account?</span>
        <Link to={Routes.SIGN_UP} className={classes.singup_link}>Sing Up</Link>
        <Link to={Routes.PASSWORD_FORGET} className={classes.singup_link}>Forgot Password?</Link>
        <Link to={Routes.PASSWORD_CHANGE} className={classes.singup_link}>Change Password</Link>

      </div>
    </form>
  </div>)

  let authRedirect = null
  if (props.isAuthicated)
    authRedirect = <Redirect to={props.authRedirectpath} />

  return (
    <Fragment>
      {authRedirect}
      {form}
    </Fragment>
  )


}
const stateMapToprops = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthicated: state.authReducer.token !== null,
    authRedirectpath: state.authReducer.authRedirectpath

  }
}

const dispatchMapToProps = dispatch => {
  return {
    onAuth: (email, address, singUpMode) => dispatch(actions.auth(email, address, singUpMode)),
    onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/'))

  }

}

export default connect(stateMapToprops, dispatchMapToProps)(Login);