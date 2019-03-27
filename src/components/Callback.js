import React from 'react';
import Screen from './Screen';
import { Alert, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Button, Body, Form } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import { Formik } from 'formik';
import StringMask from 'string-mask';
import {
  handleTextInput
} from 'react-native-formik';
import * as Yup from 'yup';
import { TextField } from 'react-native-material-textfield';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Необходимо указать телефон')
});

const MyInput = handleTextInput(TextField);

const phoneMask = '+0(000)000-00-00';

export default class Feedback extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Перезвонить мне' />,
  };

  formSubmit(values, actions){
    // ensure that the phone doesn't overflow the mask
    // TODO: find a better way to handle it
    values.phone = values.phone.substring(0, phoneMask.length);
    console.log('form submit', values);
    actions.setSubmitting(false);
    // Api.restorePassword(values.email)
    //   .then(data => {
    //     console.log('data:', data);
    //
    //     if (data.msg != 'OK')
    //       throw data.msg;
    //
    //     Alert.alert('Recovery success', 'На вашу почту отправлено письмо с описанием следующего шага');
    //   })
    //   .then(data => {
    //     setTimeout(() => this.props.navigation.navigate('Login'), 1000);
    //   })
    //   .catch(e => actions.setFieldError('general', e.toString()))
    //   .finally(() => actions.setSubmitting(false));
  }

  formatPhoneNumber = value => {
    if (phoneMask && value) {
      let output = StringMask
        .process(value.replace(/\D+/g, ''), phoneMask)
        .result;
      return output;
    }

    return value;
  }

  render() {
    const inputStyle = {
      textColor: dP.color.white,
      baseColor: '#ABABAB',
      tintColor: dP.color.accent,
      errorColor: dP.color.error,
    };

    return (
      <ScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView
          keyboardVerticalOffset = {300}
          style = {{ flex: 1, padding: 24 }}
          behavior = "padding" >
          <Formik
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            initialValues={{
              name: '',
              phone: '',
            }}
            render={formikProps => {
              return (
                <Form>
                  <MyInput
                    label='Ваше имя'
                    name='name'
                    type='name'
                    {...inputStyle}
                  />
                  <MyInput
                    label='Телефон'
                    name='phone'
                    type='digits'
                    value={this.formatPhoneNumber(formikProps.values.phone)}
                    {...inputStyle}
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
