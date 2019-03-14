import React from 'react';
import {Alert, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import Screen from './Screen';
import {Button, Container, Footer, FooterTab, Icon, Content, Body, Form, Item, Input, IconNB, TouchableOpacity } from 'native-base';
// import FingerPrint from './touchid';
import Expo, { Constants } from 'expo';
import {styles, dP} from '../../utils/style/styles';
import LogoTitle from '../elements/LogoTitle';
// import StandardFooter from '../elements/Footer';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-materialui-textfield';
import NavBack from '../elements/NavBack';

export default class SignUp extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      compatible: false,
      fontLoaded: false,
      // registration: false,
      firstName: '',//'Jon',
      secondName: '',//'Nedson',
      lastName: '',//'Snow',
      email: '',//'testing@test.com',
      phone: '',//'+79998774513',
      password: '',//'qwerty'
    };
  }

    static navigationOptions = {
      headerBackImage: <NavBack />,
      headerBackTitle: null,
      headerTitle: navigation  =>  <LogoTitle title='Регистрация' />,
      headerStyle: styles.baseHeader,
      headerTintColor: '#fff',
    };

    componentDidMount() {
      // this.checkDeviceForHardware();
    }


    static fetchAuthData(){
      return true;
    }

    formSubmit(){
      console.log('form submit');
      fetch('https://mp.api.easy4.pro/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          secondName: this.state.secondName,
          lastName: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password
        }),
      })
        .then(response => response.json())
        .then(data => {
          // this.setState({registration: true});
          console.log('data:', data);

          if (!data._id)
            throw data.msg;

        })
        .then(data => {
          console.log('redirect to login');
          this.props.navigation.navigate('Login');
        })
        .catch(e => Alert.alert('SignUp error', e));
    }

    render(data) {

      console.log('state: ', this.state);
      return (
        <ScrollView style={{backgroundColor: dP.color.primary}}
          keyboardShouldPersistTaps='always' >
          <KeyboardAvoidingView
            keyboardVerticalOffset = {100}
            style = {{ flex: 1, padding: 24, height: '100%' }}
            behavior = "padding" >

            <Form>
              <TextField
                label="Имя"
                textColor={'#FFFFFF'}
                baseColor={'#ABABAB'}
                tintColor={'#FED657'}
                onChangeText={(firstName) => this.setState({firstName})}
                value={this.state.firstName}
              />
              <TextField
                label="Отчество"
                textColor={'#FFFFFF'}
                baseColor={'#ABABAB'}
                tintColor={'#FED657'}
                onChangeText={(secondName) => this.setState({secondName})}
                value={this.state.secondName}
              />
              <TextField
                label="Фамилия"
                textColor={'#FFFFFF'}
                baseColor={'#ABABAB'}
                tintColor={'#FED657'}
                onChangeText={(lastName) => this.setState({lastName})}
                value={this.state.lastName}
              />
              <TextField
                label="Электронная почта"
                textColor={'#FFFFFF'}
                baseColor={'#ABABAB'}
                tintColor={'#FED657'}
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <TextField
                label="Номер телефона"
                textColor={'#FFFFFF'}
                baseColor={'#ABABAB'}
                tintColor={'#FED657'}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
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
                onPress={() => this.formSubmit()}
              >
                <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                  Создать аккаунт
                </Text>
              </Button>
            </Body>

          </KeyboardAvoidingView>
        </ScrollView>
      );
    }
}
