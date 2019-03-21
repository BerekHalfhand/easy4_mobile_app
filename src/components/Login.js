import React from 'react';
import { Alert, ActivityIndicator, Text, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import Screen from './Screen';
import {Button, Container, Content, Body, View, Input, IconNB, TouchableOpacity } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import autoBind from 'react-autobind';
import Api from 'app/utils/api';
import {setAccessToken, setRefreshToken, checkToken} from 'app/src/actions';
import { Formik } from 'formik';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from 'react-native-formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .required('Необходимо указать email или телефон'),
  password: Yup.string()
    .required('Необходимо указать пароль'),
});

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(InputWithIcon);

// TODO: make this shit work
const Form = withNextInputAutoFocusForm(View);

class Login extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Вход' />,
  };

  // componentDidMount() {
  //   this.fetchAuthData();
  // }
  //
  //
  // fetchAuthData = async () => {
  //   try {
  //     if (this.props.accessToken) {
  //       console.log('checking the fucking token')
  //       this.props.dispatch(checkToken(this.props.accessToken))
  //         // .then(data => {
  //         //   console.log('data:',data);
  //         //
  //         //   if (data.login)
  //         //     this.props.navigation.navigate('Main');
  //         // });
  //     }
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // }

  onPressRecovery() {
    this.props.navigation.navigate('Recovery');
  }

  formSubmit(values, actions){
    console.log('form submit', values);
    Api.login(values.login, values.password)
      .then(data => {
        console.log('data:', data);

        if (!data.accessToken)
          throw data.msg;

        this.props.dispatch(setAccessToken(data.accessToken));
        this.props.dispatch(setRefreshToken(data.refreshToken));
      })
      .then(data => {
        console.log('saved response, redirect');
        this.props.navigation.navigate('Main');
      })
      .catch(e => actions.setFieldError('general', e.toString()))
      .finally(() => actions.setSubmitting(false));
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView
          keyboardVerticalOffset = {280}
          style = {{ flex: 1, padding: 24 }}
          behavior = "padding" >
          <Formik
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            initialValues={{
              login: 'develop@easy4.pro',
              password: 'qweASD123',
            }}
            render={formikProps => {
              return (
                <Form>
                  <MyInput
                    label='Телефон или электронная почта'
                    name='login'
                    type='email'
                    icon='person-outline'
                  />
                  <MyInput
                    label='Пароль'
                    name='password'
                    isPassword={true}
                    icon='visibility-off'
                    altIcon='visibility'
                  />

                  <Body style={{margin: 24}}>
                    <Text style={{ color: dP.color.error }}>{formikProps.errors.general}</Text>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button full rounded
                        style={styles.buttonPrimary}
                        onPress={formikProps.handleSubmit}
                      >
                        <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                          Войти
                        </Text>
                      </Button>
                    )}
                  </Body>

                  <Body style={{margin: 24}}>
                    <Button full transparent rounded
                      style={styles.buttonPrimaryInverse}
                      onPress={this.onPressRecovery}
                    >
                      <Text style={{fontFamily:'SFCT_Semibold',letterSpacing:0.29, color:'#FED657', fontSize:16}}>
                        Забыли пароль?
                      </Text>
                    </Button>
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

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Login);

// const mapStateToProps = ({ _persist = {}, data = {}, isLoadingData = false, accessToken = null }) => ({
//   _persist,
//   data,
//   isLoadingData,
//   accessToken
// });
// export default connect(
//   mapStateToProps,
//   {
//     checkToken
//   }
// )(Login);
