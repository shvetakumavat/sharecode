import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {GoogleOAuthProvider} from "@react-oauth/google"
import { reducers } from './reducers';
import App from './App';
import './index.css';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
     <GoogleOAuthProvider
                clientId={`681873984744-9241juton944cref0mhhqbfltcb1tiqg.apps.googleusercontent.com`}>
       <App />
       </GoogleOAuthProvider>
  </Provider>,
  document.getElementById('root'),
);
