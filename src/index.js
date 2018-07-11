import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import examinersReducer from './store/reducers/examiners';
import authReducer from './store/reducers/auth';
import sessionReducer from './store/reducers/sessions';
import generalReducer from './store/reducers/general';
import periodsReducer from './store/reducers/periods/periods';

const reducer = combineReducers({
  ex: examinersReducer,
  auth: authReducer,
  sess: sessionReducer,
  gen: generalReducer,
  per: periodsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
