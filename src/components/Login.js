import React from 'react';
import { Alert, Text, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import Screen from './Screen';
import {Button, Container, Content, Body, Form, Input, IconNB, TouchableOpacity } from 'native-base';
import {styles, dP} from '../../utils/style/styles';
import LogoTitle from '../elements/LogoTitle';
import StandardFooter from '../elements/Footer';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-materialui-textfield';
import NavBack from '../elements/NavBack';
import autoBind from 'react-autobind';

export default class Login extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      error: false,
      login: '',
      password: '',
      compatible: false,
      fontLoaded: false,
    };
  }

  static navigationOptions = {
    // TODO: make a proper inheritance from Screen
    headerBackImage: <NavBack />,
    headerBackTitle: null,
    headerTitle: navigation  =>  <LogoTitle title='Вход' />,
    headerStyle: styles.baseHeader,
    headerTintColor: '#fff',
  };

  componentDidMount() {
    // this.checkDeviceForHardware();
  }


  static fetchAuthData(){
    return true;
  }

  onPressRecovery() {
    this.props.navigation.navigate('Recovery');
  }

  formSubmit(){
    console.log('form submit');
    fetch('https://mp.api.easy4.pro/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.login,
        password: this.state.password
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('data:', data);

        if (!data.accessToken)
          throw data.msg;

        AsyncStorage.setItem(
          'accessToken', data.accessToken
        );
        AsyncStorage.setItem(
          'refreshToken', data.refreshToken
        );

      })
      .then(data => {
        console.log('saved response, redirect');
        this.props.navigation.navigate('Main');
      })
      .catch(e => Alert.alert('Authentication error', e.toString()));

    //TODO  to finish registration and login, sae data in storage
  }

  render(data) {

    console.log('state: ', this.state);
    // if (this.state.fontLoaded) {
    return (
      <ScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView
          keyboardVerticalOffset = {280} // adjust the value here if you need more padding
          style = {{ flex: 1, padding: 24 }}
          behavior = "padding" >

          <Form>

            <TextField
              label="Телефон или электронная почта"
              textColor={'#FFFFFF'}
              baseColor={'#ABABAB'}
              tintColor={'#FED657'}
              textContentType="username"
              onChangeText={(login) => this.setState({login})}
              value={this.state.login}
            />
            <PasswordInputText
              textColor={'#FFFFFF'}
              baseColor={'#ABABAB'}
              tintColor={'#FED657'}
              iconColor={'#FED657'}
              value={this.state.password}
              onChangeText={ (password) => this.setState({ password }) }
            />

          </Form>
          <Body style={{margin: 24}}>
            <Button full rounded
              style={styles.buttonPrimary}
              onPress={this.formSubmit}
              // onPress={() => this.props.navigation.navigate('Main')}
            >
              <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                Войти
              </Text>
            </Button>
          </Body>

          <Body style={{margin: 24}}>
            <Button full transparent rounded
              style={styles.buttonPrimaryInverse}
              onPress={this.onPressRecovery}
            >
              <Text style={{fontFamily:'SFCT_Semibold',letterSpacing:0.29, color:'#FED657', fontSize:16}}>
                Забыли пароль?
              </Text>

            </Button>
          </Body>
        </KeyboardAvoidingView>

      </ScrollView>
    );
    // }
    // return(
    //     <Container>
    //         <Content padder style={{backgroundColor: dP.color.primary}}></Content>
    //     </Container>
    // )
  }
}
