import React from 'react';
import {Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import Screen from './Screen';
import {Button, Container, Footer, FooterTab, Icon, Content, Body, Form, Item, Input, IconNB, TouchableOpacity } from 'native-base';
// import FingerPrint from './touchid';
import Expo, { Constants } from 'expo';
import {styles, dP} from '../../utils/style/styles';
import LogoTitle from '../elements/LogoTitle';
// import StandardFooter from '../elements/Footer';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-materialui-textfield';

export default class Login extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      compatible: false,
      fontLoaded: false,
      registration: false
    };
  }

    static navigationOptions = {
      title: 'Назад',
      headerTitle: navigation  =>  <LogoTitle
        titleSize={20}
        subTitleSize={13}
        title='Регистрация'
      />,

      headerStyle: {
        backgroundColor:'#004d99',
      },
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
      fetch('http://192.168.3.101:8081/users', {
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
        .then(res => {
          this.setState({registration: true});
          console.log('res:', res);
          console.log('registraton:', this.state);
        });
    }

    render(data) {

      console.log('state: ', this.state);
      // if (this.state.fontLoaded) {
      return (
        <ScrollView style={{backgroundColor: dP.color.primary}}
          keyboardShouldPersistTaps='always' >
          <KeyboardAvoidingView
            keyboardVerticalOffset = {100} // adjust the value here if you need more padding
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
                // onPress={() => ( this.onPressLogin() ? this.props.navigation.navigate('Main') : null )}
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
      // }
      // return(
      //     <Container>
      //         <Content padder style={{backgroundColor: dP.color.primary}}></Content>
      //     </Container>
      // )
    }
}
