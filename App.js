import React from 'react';
// import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
// import Root from './src/components/Root';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Main from './src/components/Main';





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

});


const App = createAppContainer(Routes);

export default App;
// AppRegistry.registerComponent('App', () => App);
//
// export default App;
