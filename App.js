import React from 'react';
// import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
// import reducer from './reducer';
// import Banner from './src/components/Banner';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Main from './src/components/Main';
import Tariff from './src/components/Tariff';
import IncreaseBalance from './src/components/IncreaseBalance';
import SignUp from './src/components/SignUp';
import Recovery from './src/components/Recovery';
import Chatroom from './src/components/Chatroom';

// const store = createStore(reducer);

const Routes = createStackNavigator({
  // Banner: {
  //   screen: Banner
  // },
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Main: {
    screen: Main
  },
  Tariff: {
    screen: Tariff
  },
  IncreaseBalance: {
    screen: IncreaseBalance
  },
  SignUp: {
    screen: SignUp
  },
  Recovery: {
    screen: Recovery
  },
  Chatroom: {
    screen: Chatroom
  }

}, {
  headerLayoutPreset: 'center',
  headerBackTitle: null,
});

// turning off in-app warnings
console.disableYellowBox = true;

// fewer red screens of death
console.reportErrorsAsExceptions = false;

const App = createAppContainer(Routes);

export default App;
// AppRegistry.registerComponent('App', () => App);
