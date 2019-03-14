import React from 'react';
// import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
// import reducer from './reducer';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Main from './src/components/Main';
import Tariff from './src/components/Tariff';
import IncreaseBalance from './src/components/IncreaseBalance';
import SignUp from './src/components/SignUp';
import Recovery from './src/components/Recovery';

// const store = createStore(reducer);

const Routes = createStackNavigator({
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

}, {
  headerLayoutPreset: 'center',
  headerBackTitle: null,
});


const App = createAppContainer(Routes);

export default App;
// AppRegistry.registerComponent('App', () => App);
//
// export default App;
