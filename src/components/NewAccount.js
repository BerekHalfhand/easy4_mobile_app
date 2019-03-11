import React from 'react';
import {TextInput, Image, StatusBar, View, Navigator, Text} from 'react-native';
import Screen from './Screen';
import {Button, Container, Footer, FooterTab, Icon, Content, Body, Form, Item, Input, IconNB, TouchableOpacity } from 'native-base';
// import FingerPrint from './touchid';
import Expo, { Constants } from 'expo';
import {styles, dP} from '../../utils/style/styles';
import LogoTitle from '../elements/LogoTitle';
import StandardFooter from '../elements/Footer';

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
        <Container>
          <Content style={{backgroundColor: dP.color.primary, paddingTop: 40, padding: 24}}>
            <Form>
              <Input placeholder="Имя"
                style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, 'color': '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                placeholderTextColor={'#ABABAB'}
                onChangeText={(firstName) => this.setState({firstName})}
                value={this.state.firstName}
              />
              <Input placeholder="Отчество"
                style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, 'color': '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                placeholderTextColor={'#ABABAB'}
                onChangeText={(secondName) => this.setState({secondName})}
                value={this.state.secondName}
              />
              <Input placeholder="Фамилия"
                style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, color: '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                placeholderTextColor={'#ABABAB'}
                onChangeText={(lastName) => this.setState({lastName})}
                value={this.state.lastName}
              />
              <Input placeholder="Электронная почта"
                style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, color: '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                placeholderTextColor={'#ABABAB'}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <Input placeholder="Номер телефона"
                style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, color: '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                placeholderTextColor={'#ABABAB'}
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
              />
              <Input placeholder="Пароль"
                style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, 'color': '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                placeholderTextColor={'#ABABAB'}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </Form>
            <Body style={{marginTop: 48}}>
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
          </Content>
          <StandardFooter/>
        </Container>
      );
      // }
      // return(
      //     <Container>
      //         <Content padder style={{backgroundColor: dP.color.primary}}></Content>
      //     </Container>
      // )
    }
}
