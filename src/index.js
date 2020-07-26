import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Firebase, { FirebaseContext } from './components/Firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import products from './store/reducers/products'
import auth from './store/reducers/auth'
import user from './store/reducers/users'

const rootReducer = combineReducers({
  productsReducer: products,
  authReducer: auth,
  userReducer: user
})
const rrfConfig = {
  userProfiles: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
}

// const middleWares = [thunk.withExtraArgument({ getFirebase, getFirestore })]
const middleWares = [thunk]
// const composeEnhancer = composeWithDevTools(applyMiddleware(...middleWares), reactReduxFirebase(rrfConfig, firebase))

const store = createStore(rootReducer, applyMiddleware(...middleWares))

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
