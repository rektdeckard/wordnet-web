import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react';

import App from "./components/App";
import store from "./reducers";

Amplify.configure(awsconfig);

const signUpConfig = {
  header: "Create a new WordNet account",
  signUpFields: [
    {
      label: 'Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 3,
      type: 'password'
    },
    {
      label: 'Phone Number',
      key: 'phone_number',
      required: true,
      displayOrder: 4,
      type: 'string'
    }
  ]
};

const theme = {
  ...AmplifyTheme
}

const AppWithAuthentication = withAuthenticator(App, { signUpConfig }, [], null, theme);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppWithAuthentication />
    </Router>
  </Provider>,
  document.getElementById("root")
);
