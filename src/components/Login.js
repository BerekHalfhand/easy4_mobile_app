import React from 'react';
import { ActivityIndicator, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import Screen from './Screen';
import {Button, Body, View } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import autoBind from 'react-autobind';
import {login} from 'app/src/actions';
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

  onPressRecovery() {
    this.props.navigation.navigate('Recovery');
  }

  formSubmit(values){
    console.log('form submit', values);
    this.props.dispatch(login(values.login, values.password));
  }

  render() {
    const error = (this.props.errors && this.props.errors.loginError ?
      (<Text style={{ color: dP.color.error, marginBottom: 10 }}>
        {this.props.errors.loginError}
      </Text>) : null );

    return (
      <ScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView
          keyboardVerticalOffset = {280}
          style = {{ flex: 1, padding: 24 }}
          behavior = "padding" >
          <Formik
            onSubmit={(values) => this.formSubmit(values)}
            validationSchema={validationSchema}
            initialValues={{
              login: '',
              password: '',
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
                    {error}
                    {this.props.busy && this.props.busy.login ? (
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

const mapStateToProps = state => state.api;

export default connect(mapStateToProps)(Login);
