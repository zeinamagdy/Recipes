import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Firebase, { FirebaseContext } from './components/Firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import products from './store/reducers/products'
import auth from './store/reducers/auth'

const rootReducer = combineReducers({
  productsReducer: products,
  authReducer: auth
})
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </FirebaseContext.Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
