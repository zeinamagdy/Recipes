import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import * as actions from './store/actions'
import * as Routes from './constants/routes'

import './App.css';
import Products from './components/Products/Products'
import Auth from './components/Auth/Auth'
import Singup from './components/Auth/singup/Singup'
import Logout from './components/Auth/Logout/Logout'

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
      <Redirect to={Routes.ADMIN} />
    </Switch>
  );
  if (props.isAuthenicated)
    routes = (
      <Switch>
        <Route path={Routes.ADMIN} exact component={Products} />
        {/* should froward props to component in Routes */}
        <Route path={Routes.SIGN_IN} render={props => <Auth {...props} />} />
        <Route path={Routes.LOGOUT} component={Logout} />
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