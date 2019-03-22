import React from 'react';
import {Alert, ActivityIndicator, Dimensions, Platform, Text, KeyboardAvoidingView, Keyboard, ScrollView} from 'react-native';
import Screen from './Screen';
import {Button, Body, View} from 'native-base';
// import FingerPrint from './touchid';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import autoBind from 'react-autobind';
import {signup} from 'app/src/actions';
import { Formik } from 'formik';
import { wrapScrollView } from 'react-native-scroll-into-view';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from 'react-native-formik';
import * as Yup from 'yup';

const CustomScrollView = wrapScrollView(ScrollView);

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Некорректный email адрес')
    .required('Необходимо указать электронную почту')
    .label('Электронная почта'),

  password: Yup
    .string()
    .required('Необходимо указать пароль')
    .min(6, 'Пароль должен быть длиннее пяти символов')
    .label('Пароль')
    .test('password-valid', 'Допускаются только цифры и латинские буквы', (value) => {
      let regex = new RegExp(/^[a-z0-9]+$/i);
      return regex.test(value);
    }),
});

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(InputWithIcon);

const Form = withNextInputAutoFocusForm(View);

class SignUp extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Регистрация' />,
  };

  formSubmit(values) {
    console.log('form submit', values);
    this.props.dispatch(signup(values.email, values.password));
  }

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 64;

    const error = (<Text style={{ color: dP.color.error, marginBottom: 10 }}>
      {this.props.errors && this.props.errors.signupError}
    </Text>);

    return (
      <CustomScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView enabled
          keyboardVerticalOffset = {keyboardVerticalOffset}
          style = {{ flex: 1, padding: 24 }}
          behavior = "padding" >

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              secondName: '',
              email: '',
              phone: '',
              password: '',
            }}
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            render={formikProps => {
              return (
                <Form>
                  <MyInput
                    label='Электронная почта'
                    name='email'
                    type='email'
                  />
                  <MyInput
                    label='Пароль'
                    name='password'
                    isPassword={true}
                    icon='visibility-off'
                    altIcon='visibility'
                  />

                  <Body style={{margin: 24}}>
                    {this.props.errors && this.props.errors.signupError ? error : null}
                    {this.props.isLoadingData ? (
                      <ActivityIndicator />
                    ) : (
                      <Button full rounded
                        style={styles.buttonPrimary}
                        onPress={formikProps.handleSubmit}
                      >
                        <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:14, color:'#005eba'}}>
                          Зарегистрироваться
                        </Text>
                      </Button>
                    )}
                  </Body>
                </Form>
              );
            }}
          />


        </KeyboardAvoidingView>
      </CustomScrollView>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(SignUp);
