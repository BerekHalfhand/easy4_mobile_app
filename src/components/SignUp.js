import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import Screen from './Screen';
import {Button, Body, View, Container, Content} from 'native-base';
import StandardFooter from 'app/src/elements/Footer';
// import FingerPrint from './touchid';
import {styles} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import autoBind from 'react-autobind';
import {signup} from 'app/src/actions';
import { Formik } from 'formik';
// import { wrapScrollView } from 'react-native-scroll-into-view';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from 'react-native-formik';
import * as Yup from 'yup';

// const CustomScrollView = wrapScrollView(ScrollView);

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
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content}>
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
                    {this.showError('signupError')}
                    {this.props.busy && this.props.busy.signup ? (
                      <ActivityIndicator />
                    ) : (
                      <Button full rounded
                        style={{...styles.buttonPrimary, width: '100%'}}
                        onPress={formikProps.handleSubmit}
                      >
                        <Text style={styles.textButtonPrimary}>
                          Зарегистрироваться
                        </Text>
                      </Button>
                    )}
                  </Body>

                </Form>
              );
            }}
          />
        </Content>
        <StandardFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => state.api;

export default connect(mapStateToProps)(SignUp);
