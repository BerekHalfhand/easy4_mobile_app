import React from 'react';
import Screen from './Screen';
import { Text, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Button, Body, Form } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import NavBack from 'app/src/elements/NavBack';

export default class Recovery extends Screen {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {
    headerBackImage: <NavBack />,
    headerBackTitle: null,
    headerTitle: navigation  =>  <LogoTitle title='Сброс пароля' />,
    headerStyle: styles.baseHeader,
    headerTintColor: '#fff',
  };

  formSubmit(){
    console.log('form submit');
    // fetch('http://192.168.3.101:8080/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     login: this.state.login,
    //     password: this.state.password
    //   }),
    // })
    //   .then(response => {
    //     response.json();
    //     console.log('response:',response);
    //   })
    //   .then(data => {
    //     AsyncStorage.setItem(
    //       'accessToken',data.accessToken
    //     );
    //     AsyncStorage.setItem(
    //       'refreshToken',data.refreshToken
    //     );
    //
    //   });
  }

  render() {
    // console.log('state: ', this.state);
    return (
      <ScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView
          keyboardVerticalOffset = {64}
          style = {{ flex: 1, padding: 24 }}
          behavior = "padding" >

          <Form>
            <InputWithIcon
              label="Телефон или электронная почта"
              textContentType='username'
              onChangeText={(login) => this.setState({login})}
              value={this.state.login}
            />
          </Form>

          <Body style={{margin: 24}}>
            <Button full rounded
              style={styles.buttonPrimary}
              onPress={() => this.formSubmit()}
            >
              <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                Отправить
              </Text>
            </Button>
          </Body>

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
