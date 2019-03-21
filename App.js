import React from 'react';
// import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import Drawer from 'app/src/elements/Drawer';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'app/src/store';

// import Banner from './src/components/Banner';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Main from './src/components/Main';
import Tariff from './src/components/Tariff';
import IncreaseBalance from './src/components/IncreaseBalance';
import SignUp from './src/components/SignUp';
import Recovery from './src/components/Recovery';
import Chatroom from './src/components/Chatroom';
import Callback from './src/components/Callback';

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
  },
  Callback: {
    screen: Callback
  },

}, {
  initialRouteName: 'Home',
  headerLayoutPreset: 'center',
  headerBackTitle: null,

  navigationOptions: {
    headerMode: 'screen' // enabling header mode for main screen
  }
});

const AppNavigator = createDrawerNavigator({
  Home: { screen: Routes },
  // IncreaseBalance: {
  //   screen: IncreaseBalance,
  //   navigationOptions: ({ navigation }) => ({
  //     title: 'Пополнить баланс',
  //     // headerLeft: <HamburgerIcon navigationProps={navigation} />,
  //     //
  //     // headerStyle: {
  //     //   backgroundColor: '#FF9800'
  //     // },
  //     // headerTintColor: '#fff',
  //   })
  // },
}, {
  contentComponent: Drawer
});


// turning off in-app warnings
console.disableYellowBox = true;

// fewer red screens of death
console.reportErrorsAsExceptions = false;

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer/>
        </PersistGate>
      </Provider>
    );
  }
}

// TODO: perhaps there is a better way to connect, once
// const mapStateToProps = state => ({ ...state })
//
// export default connect(mapStateToProps)(App);
