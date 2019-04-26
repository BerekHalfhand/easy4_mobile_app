import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Screen from './Screen';
import {Button, Body, View, Container, Content, CheckBox } from 'native-base';
import StandardFooter from 'app/src/elements/Footer';
import {styles} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import NavigationService from 'app/src/services/NavigationService';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import autoBind from 'react-autobind';
import {login, toggleDoNotPersist, esiaLink} from 'app/src/actions';
import { Formik } from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LocalAuthentication, SecureStore } from 'expo';
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
    this.state = {
      savedLogin: null,
    };
    this.checkSaved();
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

  onPressEsia = () => {
    this.props.dispatch(esiaLink());
  }

  onPressTouchId = async () => {
    const {dispatch, bioTouch, bioFace, bioSaved} = this.props;
    if (bioSaved && (bioTouch || bioFace)) {
      LocalAuthentication.authenticateAsync()
        .then(result => {
          console.log('authenticateAsync', result);
          if (result.success) {
            Promise.all([
              SecureStore.getItemAsync('login'),
              SecureStore.getItemAsync('password')]
            )
              .then(credentials => this.props.dispatch(login(credentials[0], credentials[1])));
          }
        });
    }
  }

  checkSaved = async () => {
    let savedLogin = await SecureStore.getItemAsync('login');
    if (savedLogin) {
      this.setState({savedLogin});
    }
  }

  formSubmit = values => {
    // console.log('form submit', values);
    this.props.dispatch(login(values.login, values.password));
  }

  renderContent() {
    const {bioTouch, bioFace, bioSaved} = this.props;
    const biometrics = (bioSaved && (bioTouch || bioFace) && this.state.savedLogin ? (
      <View style={{alignItems: 'center', marginBottom: 8 }}>
        <TouchableOpacity
          style={{padding: 8}}
          onPress={this.onPressTouchId}
        >
          <MaterialIcons name='fingerprint' color='red' size={48} />
        </TouchableOpacity>
      </View>
    ) : null );

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
                      <View>
                        <Button full rounded
                          style={{...styles.buttonPrimary, marginBottom: 16}}
                          onPress={formikProps.handleSubmit}
                        >
                          <Text style={styles.textButtonPrimary}>
                            Войти
                          </Text>
                        </Button>

                        <Button full transparent rounded
                          style={{...styles.buttonPrimaryInverse, marginBottom: 4}}
                          onPress={this.onPressRecovery}
                        >
                          <Text style={styles.textButtonSecondary}>
                              Забыли пароль?
                          </Text>
                        </Button>

                        <Button full transparent rounded
                          style={{...styles.buttonPrimaryInverse, marginBottom: 8}}
                          onPress={this.onPressEsia}
                        >
                          <Text style={styles.textButtonSecondary}>
                              Вход через Госуслуги
                          </Text>
                        </Button>

                        { biometrics }

                        <Body style={{flexDirection: 'row', justifyContent: 'center', marginTop: 4}}>
                          <CheckBox checked={this.props.doNotPersist}
                            onPress={this.onPressDoNotPersist}
                            style={styles.checkbox}
                          />
                          <View style={{marginLeft: 12}}>
                            <Text style={styles.textLabel}>Гостевой вход</Text>
                          </View>
                        </Body>
                      </View>
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

const mapStateToProps = state => ({...state.api, ...state.app, ...state.auth});

export default connect(mapStateToProps)(Login);
