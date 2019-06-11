import React from 'react';
import NavigationService from 'app/src/services/NavigationService';
import { connect } from 'react-redux';

import {
  Content,
  Text,
  Container,
  Button
} from 'native-base';
import {Image, Linking, View} from 'react-native';
import Screen from './Screen';
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import StandardFooter from 'app/src/elements/Footer';
import {
  checkToken,
  setBiometryTypes,
  setBiometrySaved,
  readState,
  resetState,
  setId,
} from 'app/src/actions';
import { LocalAuthentication, Constants } from 'expo';
import {font} from 'app/utils/helpers';

class Home extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);

    props.dispatch(readState());
    props.fetchAuthData(props.accessToken, props.refreshToken);
    props.determineBiometryStatus();
    props.identifyUser(props.user);
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  onPressLogin() {
    if (this.props.accessToken)
      NavigationService.navigate('Main');
    else
      NavigationService.navigate('Login');
  }

  onPressSignUp() {
    NavigationService.navigate('SignUp');
  }

  onReset = () => {
    this.props.dispatch(resetState());
  }

  renderContent() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} contentContainerStyle={styles.contentCentered}>
          <View style={{ justifyContent: 'center', height: 120}}>
            <Image
              style={{width: 90, height: 120, resizeMode: 'contain'}}
              source={require('app/assets/image/logo3x.png')}
            />
          </View>
          <View style={{marginTop: 24}}>
            <Text style={styles.textBlockH}>Добро пожаловать</Text>
          </View>
          <View style={{marginTop: 16}}>
            <Text style={styles.textSimple}>Безроуминговый оператор связи</Text>
          </View>
          <View style={{marginTop: 32}}>
            <Button full rounded
              style={styles.buttonPrimary}
              onPress={this.onPressLogin}
            >
              <Text style={styles.textButtonPrimary} uppercase={false}>
                Войти
              </Text>
            </Button>
          </View>

          <View style={{marginTop: 12}}>
            <Button full transparent rounded
              style={styles.buttonPrimaryInverse}
              onPress={this.onPressSignUp}
            >
              <Text style={styles.textButtonSecondary} uppercase={false}>
                Регистрация
              </Text>

            </Button>
          </View>

          <View style={{marginTop: 16}}>
            <Text style={font('SFCT_Regular', 16, '#D4D4D4', -0.25, {textAlign: 'center'})}>Продолжая работу с приложением, вы соглашаетесь с{'\n'}
              <Text style={{...styles.textSimple, textDecorationLine: 'underline'}}
                onPress={() => Linking.openURL('https://easy4.pro/privacy.html') } >
                Политикой конфиденциальности
              </Text>
              {' '}и{'\n'}
              <Text style={{...styles.textSimple, textDecorationLine: 'underline'}}
                onPress={() => Linking.openURL('https://easy4.pro/upload/bf/usloviya2.pdf') } >
                Условиями оказания услуг
              </Text>
             .
            </Text>
          </View>

          <View style={{marginTop: 16}}>
            <Text style={styles.textSimple}>Телефон поддержки:{' '}
              <Text style={{...styles.textSimple, textDecorationLine: 'underline'}}
                onPress={() => Linking.openURL('tel://+79587981111') } >
                +7 (958) 798 1111
              </Text>
            </Text>
          </View>

        </Content>
        <StandardFooter />
      </Container>

    );
  }
}

const mapStateToProps = state => ({...state.auth, ...state.app});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    determineBiometryStatus: () => {
      LocalAuthentication.supportedAuthenticationTypesAsync()
        .then(e => {
          console.log('supportedAuthenticationTypesAsync', e);
          dispatch(setBiometryTypes(e));
        });

      LocalAuthentication.isEnrolledAsync()
        .then(e => {
          console.log('isEnrolledAsync', e);
          dispatch(setBiometrySaved(e));
        });
    },
    fetchAuthData: async (accessToken, refreshToken) => {
      try {
        if (accessToken && refreshToken) {
          console.log('Found accessToken: ', accessToken);
          dispatch(checkToken(accessToken, refreshToken));
        } else {
          console.log('Couldn\'t find accessToken!');
        }
      } catch (e) {
        console.log('Token check error', e);
      }
    },
    identifyUser: (user) => {
      let userId = Constants.deviceId || Constants.installationId;
      if (user && user._id)
        userId = user._id;

      dispatch(setId(userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default connect(mapStateToProps)(Home);
