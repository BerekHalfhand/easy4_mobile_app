import React from 'react';
import { AppRegistry, NetInfo } from 'react-native';
import { Asset, Font, AppLoading } from 'expo';
import { Root } from 'native-base';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import Drawer from 'app/src/elements/Drawer';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'app/src/reducers';
import NavigationService from 'app/src/services/NavigationService';
import moment from 'moment';
import 'moment/locale/ru';

import About from './src/components/About';
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
import Feedback from './src/components/Feedback';
import Contacts from './src/components/Contacts';
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
  About: { screen: About },
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
  Contacts: { screen: Contacts },
  Feedback: { screen: Feedback },
  Callback: { screen: Callback },
}, {
  initialRouteName: 'Home',
  headerLayoutPreset: 'center',
  headerBackTitle: null,

  navigationOptions: {
    headerMode: 'screen' // enabling header mode for main screen
  }
});

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: Routes,
    // navigationOptions: ({navigation}) => ({
    //   drawerLockMode: 'locked-closed'
    // })
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
    const images = [
      require('app/assets/image/banners/1.jpg'),
      require('app/assets/image/banners/2.jpg'),
      require('app/assets/image/banners/3.jpg'),
      require('app/assets/image/banners/4.jpg'),
      require('app/assets/image/tariffs/travel.png'),
      require('app/assets/image/tariffs/connect.png'),
      require('app/assets/image/logo3x.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    const loadFonts = Font.loadAsync({
      'SFCD_Black': require('app/assets/fonts/SFCompactDisplay-Black.ttf'),
      'SFCT_Semibold': require('app/assets/fonts/SFCompactText-Semibold.ttf'),
      'SFCT_Medium': require('app/assets/fonts/SFCompactText-Medium.ttf'),
      'SFCT_Regular': require('app/assets/fonts/SFCompactText-Regular.ttf'),
      'SFCT_Light': require('app/assets/fonts/SFCompactText-Light.ttf'),

      'Roboto': require('app/assets/fonts/Roboto-Regular.ttf'),
      'Roboto_thin': require('app/assets/fonts/Roboto-Thin.ttf'),
      'Roboto_light': require('app/assets/fonts/Roboto-Light.ttf'),
      'Roboto_medium': require('app/assets/fonts/Roboto-Medium.ttf'),
      'Roboto_bold': require('app/assets/fonts/Roboto-Bold.ttf'),
      'Roboto_black': require('app/assets/fonts/Roboto-Black.ttf'),
    });

    return Promise.all([loadFonts, cacheImages]);
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
        // if (this.state.bannersSeen === false)
        //   NavigationService.navigate('Banners');
        // else
        //   NavigationService.navigate('Home');
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
          <Root>
            {this.state.isReady ? appReady : appLoading}
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
