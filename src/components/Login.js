import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import Screen from './Screen';
import {Button, Body, View, Container, Content, CheckBox } from 'native-base';
import StandardFooter from 'app/src/elements/Footer';
import {styles} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import NavigationService from 'app/src/services/NavigationService';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import autoBind from 'react-autobind';
import {login, toggleDoNotPersist} from 'app/src/actions';
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
    NavigationService.navigate('Recovery');
  }

  onPressDoNotPersist() {
    this.props.dispatch(toggleDoNotPersist());
  }

  formSubmit(values){
    // console.log('form submit', values);
    this.props.dispatch(login(values.login, values.password));
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
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
                    {this.showError('loginError')}
                    {this.props.busy && this.props.busy.login ? (
                      <ActivityIndicator />
                    ) : (
                      <Button full rounded
                        style={styles.buttonPrimary}
                        onPress={formikProps.handleSubmit}
                      >
                        <Text style={styles.textButtonPrimary}>
                          Войти
                        </Text>
                      </Button>
                    )}
                  </Body>

                  <Body style={{margin: 24, marginTop: 0}}>
                    <Button full transparent rounded
                      style={styles.buttonPrimaryInverse}
                      onPress={this.onPressRecovery}
                    >
                      <Text style={styles.textButtonSecondary}>
                        Забыли пароль?
                      </Text>
                    </Button>
                  </Body>

                  <Body style={{flexDirection: 'row', justifyContent: 'center', marginTop: 24}}>
                    <CheckBox checked={this.props.doNotPersist}
                      onPress={this.onPressDoNotPersist}
                      style={styles.checkbox}
                    />
                    <View style={{marginLeft: 12}}>
                      <Text style={styles.textLabel}>Гостевой вход</Text>
                    </View>
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

const mapStateToProps = state => ({...state.api, ...state.app});

export default connect(mapStateToProps)(Login);
