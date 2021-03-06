// @flow

import 'airbnb-js-shims';
import 'lib/i18n';

import 'assets/fonts/menomonia.css';
import 'assets/fonts/opensans.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import rootReducer from 'features/reducer';

const middlewares = [thunk];

if (__DEVELOPMENT__) {
  middlewares.push(createLogger());
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

type BaseProps = {
  children?: Element<any>,
};

const Base = ({ children }: BaseProps) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default Base;
