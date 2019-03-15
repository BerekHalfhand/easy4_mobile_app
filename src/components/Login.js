import React from 'react';
import { Alert, Text, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import Screen from './Screen';
import {Button, Container, Content, Body, Form, Input, IconNB, TouchableOpacity } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import NavBack from 'app/src/elements/NavBack';
import autoBind from 'react-autobind';
import Api from 'app/utils/api';

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
    this.fetchAuthData();
  }


  fetchAuthData = async () => {
    // try {
    //   const accT = await AsyncStorage.getItem('accessToken');
    //   if (accT) {
    //     fetch('https://mp.api.easy4.pro/auth/tokens/check/'+accT, {
    //       method: 'GET',
    //     })
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log('data:',data);
    //
    //         if (data.login)
    //           this.props.navigation.navigate('Main');
    //       });
    //   }
    // } catch (e) {
    //   console.log('error', e);
    // }
  }

  onPressRecovery() {
    this.props.navigation.navigate('Recovery');
  }

  formSubmit(){
    console.log('form submit');
    Api.login(this.state.login, this.state.password)
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

            <InputWithIcon
              label='Телефон или электронная почта'
              icon='person-outline'
              textContentType='username'
              keyboardType='email-address'
              onChangeText={(login) => this.setState({login})}
              value={this.state.login}
            />
            <InputWithIcon
              label='Пароль'
              icon='visibility-off'
              altIcon='visibility'
              isPassword={true}
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
