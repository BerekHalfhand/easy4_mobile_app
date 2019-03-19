import React from 'react';
import Screen from './Screen';
import { Alert, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Button, Body, Form } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import Api from 'app/utils/api';
import { Formik } from 'formik';
import {
  handleTextInput
} from 'react-native-formik';
import * as Yup from 'yup';
import { TextField } from 'react-native-material-textfield';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Необходимо указать email')
    .email('Необходимо указать корректный email')
});

const MyInput = handleTextInput(TextField);

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

  formSubmit(values, actions){
    console.log('form submit', values);
    Api.restorePassword(values.email)
      .then(data => {
        console.log('data:', data);

        if (data.msg != 'OK')
          throw data.msg;

        Alert.alert('Recovery success', 'На вашу почту отправлено письмо с описанием следующего шага');
      })
      .then(data => {
        setTimeout(() => this.props.navigation.navigate('Login'), 1000);
      })
      .catch(e => actions.setFieldError('general', e.toString()))
      .finally(() => actions.setSubmitting(false));
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
          <Formik
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            initialValues={{
              email: '',
            }}
            render={formikProps => {
              return (
                <Form>
                  <MyInput
                    label='Электронная почта'
                    autoFocus
                    name='email'
                    type='email'
                    textColor={dP.color.white}
                    baseColor='#ABABAB'
                    tintColor={dP.color.accent}
                    errorColor={dP.color.error}
                  />
                  <Body style={{margin: 24}}>
                    <Text style={{ color: dP.color.error, position: 'absolute', top: -24 }}>{formikProps.errors.general}</Text>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button full rounded
                        style={styles.buttonPrimary}
                        onPress={formikProps.handleSubmit}
                      >
                        <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                          Отправить
                        </Text>
                      </Button>
                    )}
                  </Body>
                </Form>
              );
            }}
          />

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
