import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import * as actions from './store/actions'
import * as Routes from './constants/routes'

import './App.css';
import Products from './components/Products/Products'
import Auth from './components/Auth/Auth'
import Singup from './components/Auth/singup/Singup'
import PasswordForget from './components/Auth/PasswordForget'
import PasswordChange from './components/Auth/PasswordChange'
import Logout from './components/Auth/Logout/Logout'
import Users from './components/Users/Users'
import Profile from './components/Auth/Profile/Profile'

const App = props => {
  const { onTryAutoToSingUp } = props
  useEffect(() => {
    onTryAutoToSingUp()
  })
  let routes = (
    <Switch>
      {/* <Route path='/' exact component={Products} /> */}
      <Route path={Routes.ADMIN} exact component={Auth} />
      <Route path={Routes.SIGN_UP} render={props => <Singup {...props} />} />
      <Route path={Routes.PASSWORD_FORGET} render={props => <PasswordForget {...props} />} />
      <Route path={Routes.PASSWORD_CHANGE} render={props => <PasswordChange {...props} />} />
      <Route path={Routes.PROFILE} render={props => <Profile {...props} />} />
      <Redirect to={Routes.ADMIN} />
    </Switch>
  );
  if (props.isAuthenicated)
    routes = (
      <Switch>
        <Route path={Routes.ADMIN} exact component={Products} />
        <Route path={Routes.PROFILE} render={props => <Profile {...props} />} />
        {/* should froward props to component in Routes */}
        <Route path={Routes.SIGN_IN} render={props => <Auth {...props} />} />
        <Route path={Routes.LOGOUT} component={Logout} />
        <Route path={Routes.USERS} render={props => <Users {...props} />} />
        <Redirect to={Routes.ADMIN} />
      </Switch>
    )
  return (
    <div className="App">
      {routes}
    </div>
  );
}

const stateMapToProps = state => {
  return {
    isAuthenicated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoToSingUp: () => { dispatch(actions.checkAuthState()) }
  }
}
export default withRouter(connect(stateMapToProps, mapDispatchToProps)(App));