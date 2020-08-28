import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import * as actions from './store/actions'
import * as Routes from './common/constants/routes'


import './App.css';
import Products from './Dashboard/Components/Products/Products'
import Auth from './Dashboard/Components/Auth/Auth'
import Singup from './Dashboard/Components/Auth/singup/Singup'
import PasswordForget from './Dashboard/Components/Auth/PasswordForget'
import PasswordChange from './Dashboard/Components/Auth/PasswordChange'
import Logout from './Dashboard/Components/Auth/Logout/Logout'
import Users from './Dashboard/Components/Users/Users'
import Profile from './Dashboard/Components/Auth/Profile/Profile'
import ChartBar from './Dashboard/Containers/charts/BarChart'



import Home from './Users/containers/Home'

const App = props => {
  const { onTryAutoToSingUp } = props
  useEffect(() => {
    onTryAutoToSingUp()
  })
  let routes = (
    <Switch>
      <Route path='/' exact component={Home} />
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
        <Route path={Routes.CHARTS}  component={ChartBar}  />
        {/* should froward props to component in Routes */}
        <Route path={Routes.SIGN_IN} render={props => <Auth {...props} />} />
        <Route path={Routes.LOGOUT} component={Logout} />
        <Route path={Routes.USERS} render={props => <Users {...props} />} />
        <Redirect to={Routes.ADMIN} />
      </Switch>
    )
  return (
    <div>
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