import React from 'react';
import Screen from './Screen';
import { Alert, Text, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Button, Body, Form } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import Api from 'app/utils/api';

export default class Recovery extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Сброс пароля' />,
  };

  formSubmit(){
    console.log('form submit');
    Api.restorePassword(this.state.email)
      .then(data => {
        console.log('data:', data);

        if (data.msg != 'OK')
          throw data.msg;

        Alert.alert('Recovery success', 'На вашу почту отправлено письмо с описанием следующего шага');
      })
      .then(data => {
        setTimeout(() => this.props.navigation.navigate('Login'), 1000);
      })
      .catch(e => Alert.alert('Recovery error', e.toString()));
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
              label='Электронная почта'
              textContentType='emailAddress'
              keyboardType='email-address'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
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
