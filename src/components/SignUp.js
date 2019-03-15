import React from 'react';
import {Alert, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import Screen from './Screen';
import {Button, Body, Form } from 'native-base';
// import FingerPrint from './touchid';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import NavBack from 'app/src/elements/NavBack';
import Api from 'app/utils/api';

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

      Api.signup(
        this.state.firstName,
        this.state.secondName,
        this.state.lastName,
        this.state.email,
        this.state.phone,
        this.state.password
      )
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

              <InputWithIcon
                label='Имя'
                onChangeText={(firstName) => this.setState({firstName})}
                value={this.state.firstName}
              />
              <InputWithIcon
                label='Отчество'
                onChangeText={(secondName) => this.setState({secondName})}
                value={this.state.secondName}
              />
              <InputWithIcon
                label='Фамилия'
                onChangeText={(lastName) => this.setState({lastName})}
                value={this.state.lastName}
              />
              <InputWithIcon
                label='Электронная почта'
                textContentType='emailAddress'
                keyboardType='email-address'
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <InputWithIcon
                label='Номер телефона'
                keyboardType='phone-pad'
                onChangeText={(phone) => this.setState({phone})}
                value={this.state.phone}
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
