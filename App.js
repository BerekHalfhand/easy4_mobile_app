import React from 'react';
import { AppRegistry, NetInfo } from 'react-native';
import { Asset, Font, AppLoading } from 'expo';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import Drawer from 'app/src/elements/Drawer';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'app/src/reducers';
import NavigationService from 'app/src/services/NavigationService';
import moment from 'moment';
import 'moment/locale/ru';

import Loader from './src/components/Loader';
import Banners from './src/components/Banners';
import Offline from './src/components/Offline';
import Home from './src/components/Home';
import Login from './src/components/Login';
import Main from './src/components/Main';
import Tariff from './src/components/Tariff';
import TariffList from './src/components/TariffList';
import IncreaseBalance from './src/components/IncreaseBalance';
import SignUp from './src/components/SignUp';
import Recovery from './src/components/Recovery';
import Chatroom from './src/components/Chatroom';
import Callback from './src/components/Callback';

// OPTIONS

moment.locale('ru');
console.log('Selected locale:', moment.locale());

// turning off in-app warnings
console.disableYellowBox = true;

// fewer red screens of death
console.reportErrorsAsExceptions = false;

// ROUTING

const Routes = createStackNavigator({
  Loader: { screen: Loader },
  Banners: { screen: Banners },
  Offline: { screen: Offline },
  Home: { screen: Home },
  Login: { screen: Login },
  Main: { screen: Main },
  Tariff: { screen: Tariff },
  TariffList: { screen: TariffList },
  IncreaseBalance: { screen: IncreaseBalance },
  SignUp: { screen: SignUp },
  Recovery: { screen: Recovery },
  Chatroom: { screen: Chatroom },
  Callback: { screen: Callback },
}, {
  initialRouteName: 'Loader',
  headerLayoutPreset: 'center',
  headerBackTitle: null,

  navigationOptions: {
    headerMode: 'screen' // enabling header mode for main screen
  }
});

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: Routes,
    navigationOptions: ({navigation}) => ({
      drawerLockMode: 'locked-closed'
    })
  },
}, {
  contentComponent: Drawer
});

const AppContainer = createAppContainer(AppNavigator);

// ROOT

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      bannersSeen: false,
    };
  }

  loadData = async () => {
    const banners = [
      require('app/assets/image/banners/1.jpg'),
      require('app/assets/image/banners/2.jpg'),
      require('app/assets/image/banners/3.jpg'),
      require('app/assets/image/banners/4.jpg'),
    ];

    const cacheImages = banners.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    const fontLoading = Font.loadAsync({
      'SFCD_Black': require('app/assets/fonts/SFCompactDisplay-Black.ttf'),
      'SFCT_Semibold': require('app/assets/fonts/SFCompactText-Semibold.ttf'),
      'SFCT_Medium': require('app/assets/fonts/SFCompactText-Medium.ttf'),
      'SFCT_Regular': require('app/assets/fonts/SFCompactText-Regular.ttf'),
      'SFCT_Light': require('app/assets/fonts/SFCompactText-Light.ttf'),

      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    return Promise.all([fontLoading, cacheImages]);
  };

  onFinish = () => {
    this.setState({ isReady: true });
    if (store.getState().app && typeof store.getState().app.bannersSeen !== 'undefined')
      this.setState({ bannersSeen: store.getState().app.bannersSeen });

    // Check if connected
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      // If disconnected, redirect to Offline screen
      if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
        NavigationService.navigate('Offline', {route: 'Home'});
      } else {
        if (this.state.bannersSeen === false)
          NavigationService.navigate('Banners');
        else
          NavigationService.navigate('Home');
      }
    });
  }

  render () {
    const appLoading = (
      <AppLoading
        startAsync={this.loadData}
        onFinish={this.onFinish}
        onError={console.warn}
      />
    );

    const appReady = (
      <AppContainer ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      />
    );

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.state.isReady ? appReady : appLoading}
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
