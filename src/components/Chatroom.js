import React from 'react';
import Screen from './Screen';
import {Alert, ActivityIndicator, KeyboardAvoidingView, Text, ScrollView, View, WebView} from 'react-native';
import {
  Body,
  Button
} from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import { compose } from 'recompose';
import { Formik } from 'formik';
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from 'react-native-formik';
import * as Yup from 'yup';
import { TextField } from 'react-native-material-textfield';
import { TextInputMask } from 'react-native-masked-text';


const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Некорректный email адрес')
    .required('Необходимо указать электронную почту')
    .label('Электронная почта'),

  message: Yup
    .string()
    .required('Необходимо ввести сообщение')
    .label('Сообщение')
});

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const Form = withNextInputAutoFocusForm(View);

export default class Chatroom extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      phone: '+',
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Обратная связь' />,
  };

  formSubmit(values, actions) {
    console.log('form submit', values);
    Alert.alert('Ой', 'Функционал ещё не готов!');
    actions.setSubmitting(false);
    // this.props.dispatch(signup(values.email, values.password));
  }

  render() {
    // const Js = 'const meta = document.createElement(\'meta\'); \
    //             meta.setAttribute(\'content\', \'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0\'); \
    //             meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta);';
    //
    // return (
    //   <KeyboardAvoidingView
    //     keyboardVerticalOffset={80}
    //     style={{ flex: 1 }}
    //     behavior='padding' >
    //     <WebView
    //       source={{uri: 'https://crm.easy4.pro/online/easy4helper'}}
    //       scalesPageToFit={Platform.OS === 'ios' ? true : false}
    //       injectedJavaScript={Js}
    //       scrollEnabled
    //     />
    //   </KeyboardAvoidingView>
    // );
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
              phone: '+',
              email: '',
              message: '',
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

                  <TextInputMask
                    customTextInput={TextField}
                    customTextInputProps={inputStyle}
                    placeholder='+'
                    label='Телефон'
                    style={{color: 'white'}}
                    type={'cel-phone'}
                    options={{
                      withDDD: true,
                      dddMask: '+9 (999) 999-99-99'
                    }}
                    value={formikProps.values.phone}
                    onChangeText={text => formikProps.setFieldValue('phone', text)}
                  />
                  <MyInput
                    label='Электронная почта'
                    name='email'
                    type='email'
                    {...inputStyle}
                  />
                  <MyInput
                    label='Сообщение'
                    name='message'
                    type='text'
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
