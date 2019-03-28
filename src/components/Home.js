import React from 'react';
import {Font, AppLoading} from 'expo';
import NavigationService from 'app/src/services/NavigationService';
import { connect } from 'react-redux';

import {
  Content,
  CheckBox,
  Text,
  Body,
  Container,
  Button
} from 'native-base';
import {View, Image, Linking, Alert} from 'react-native';
import Screen from './Screen';
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import StandardFooter from 'app/src/elements/Footer';
import {checkToken, toggleOffer, readState, resetState} from 'app/src/actions';


class Home extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);

    props.dispatch(readState());
    this.fetchAuthData();
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  onPressLogin() {
    if (this.props.offerAccepted === true) {
      if (this.props.authorized && this.props.accessToken)
        NavigationService.navigate('Main');
      else
        NavigationService.navigate('Login');
    } else Alert.alert('Ошибка', 'Пожалуйста примите договор оферты');
  }

  onPressSignUp() {
    if (this.props.offerAccepted === true)
      NavigationService.navigate('SignUp');
    else
      Alert.alert('Ошибка', 'Пожалуйста примите договор оферты');
  }

  onReset = () => {
    this.props.dispatch(resetState());
  }

  onPressOffer = async () => {
    this.props.dispatch(toggleOffer());
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

  renderOfferCheckbox() {
    return (
      <Body style={{flexDirection: 'row', justifyContent: 'center', marginTop: 60}}>
        <CheckBox checked={this.props.offerAccepted}
          onPress={this.onPressOffer}
          style={styles.checkbox}
        />
        <View style={{marginLeft: 12}}>
          <Text style={{fontFamily:'SFCT_Regular',letterSpacing:-.025, color: '#ffffff'}}
            onPress={() => Linking.openURL('https://easy4.pro/upload/bf/usloviya2.pdf')}>Договор оферты</Text>
        </View>
      </Body>
    );
  }

  render() {
    return (
      <Container>
        <Content padder style={{backgroundColor: dP.color.primary}}>
          <Body style={{ justifyContent: 'center', marginTop: 92}}>
            <Image source={require('../../assets/image/logo-w100.png')}/>
          </Body>
          <Body style={{marginTop: 24}}>
            <Text style={{fontFamily:'SFCT_Medium', letterSpacing:-0.5, fontSize:24, color:'#FFFFFF'}}>Добро пожаловать в Easy4</Text>
          </Body>
          <Body style={{marginTop: 24}}>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, fontSize:16, color:'#FFFFFF'}}>Безроуминговый мобильный оператор</Text>
          </Body>
          <Body style={{marginTop: 48}}>
            <Button full rounded
              style={styles.buttonPrimary}
              onPress={this.onPressLogin}
            >
              <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                Войти
              </Text>
            </Button>
          </Body>

          <Body style={{marginTop: 12}}>
            <Button full transparent rounded
              style={styles.buttonPrimaryInverse}
              onPress={this.onPressSignUp}
            >
              <Text style={{fontFamily:'SFCT_Semibold',letterSpacing:0.29, color:'#FED657', fontSize:13}} align='center'>
                Регистрация
              </Text>

            </Button>
          </Body>

          {this.renderOfferCheckbox()}

        </Content>
        <StandardFooter />
      </Container>

    );
  }
}

const mapStateToProps = state => ({...state.auth, ...state.app});

export default connect(mapStateToProps)(Home);
