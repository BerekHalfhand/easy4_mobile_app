import React from 'react';
import {Font, AppLoading} from 'expo';
import NavigationService from 'app/src/services/NavigationService';
import { connect } from 'react-redux';

import {
  Content,
  CheckBox,
  Text,
  Container,
  Button
} from 'native-base';
import {Image, Linking, Alert, View} from 'react-native';
import Screen from './Screen';
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import StandardFooter from 'app/src/elements/Footer';
import {checkToken, toggleOffer, togglePolicy, setBiometryTypes, setBiometrySaved, readState, resetState} from 'app/src/actions';
import { LocalAuthentication } from 'expo';


class Home extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);

    props.dispatch(readState());
    this.fetchAuthData();
    this.determineBiometryStatus();
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  onPressLogin() {
    if (this.props.offerAccepted === true && this.props.policyAccepted === true) {
      if (this.props.accessToken)
        NavigationService.navigate('Main');
      else
        NavigationService.navigate('Login');
    } else Alert.alert('Ошибка', 'Пожалуйста примите условия оказания услуг и политику конфиденциальности');
  }

  onPressSignUp() {
    if (this.props.offerAccepted === true && this.props.policyAccepted === true)
      NavigationService.navigate('SignUp');
    else
      Alert.alert('Ошибка', 'Пожалуйста примите условия оказания услуг и политику конфиденциальности');
  }

  onReset = () => {
    this.props.dispatch(resetState());
  }

  onPressOffer = async () => {
    this.props.dispatch(toggleOffer());
  }

  onPressPolicy = async () => {
    this.props.dispatch(togglePolicy());
  }

  fetchAuthData = async () => {
    try {
      if (this.props.accessToken && this.props.refreshToken) {
        console.log('Found accessToken: ',this.props.accessToken);
        this.props.dispatch(checkToken(this.props.accessToken, this.props.refreshToken));
      } else {
        console.log('Couldn\'t find accessToken!');
      }
    } catch (e) {
      console.log('Token check error', e);
    }
  }

  determineBiometryStatus = () => {
    LocalAuthentication.supportedAuthenticationTypesAsync()
      .then(e => {
        console.log('supportedAuthenticationTypesAsync', e);
        this.props.dispatch(setBiometryTypes(e));
      });

    LocalAuthentication.isEnrolledAsync()
      .then(e => {
        console.log('isEnrolledAsync', e);
        this.props.dispatch(setBiometrySaved(e));
      });
  }

  renderOfferCheckbox() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 24}}>
        <CheckBox checked={this.props.offerAccepted}
          onPress={this.onPressOffer}
          style={styles.checkbox}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.textLabel}
            onPress={() => Linking.openURL('https://easy4.pro/upload/bf/usloviya2.pdf')}>Условия оказания услуг</Text>
        </View>
      </View>
    );
  }

  renderPolicyCheckbox() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 8}}>
        <CheckBox checked={this.props.policyAccepted}
          onPress={this.onPressPolicy}
          style={styles.checkbox}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.textLabel}
            onPress={() => NavigationService.navigate('DocPolicy')}>Политика конфиденциальности</Text>
        </View>
      </View>
    );
  }

  render() {
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
            <Text style={styles.textSimple}>Безроуминговый мобильный оператор</Text>
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

          {this.renderOfferCheckbox()}

          {this.renderPolicyCheckbox()}

        </Content>
        <StandardFooter />
      </Container>

    );
  }
}

const mapStateToProps = state => ({...state.auth, ...state.app});

export default connect(mapStateToProps)(Home);
