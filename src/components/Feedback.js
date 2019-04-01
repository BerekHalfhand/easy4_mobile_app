import React from 'react';
import Screen from './Screen';
import {Alert, ActivityIndicator, KeyboardAvoidingView, Text, ScrollView, View, WebView} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
} from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import { compose } from 'recompose';
import { sendLead } from 'app/src/actions';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from 'react-native-formik';
import * as Yup from 'yup';
import { TextField } from 'react-native-material-textfield';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Некорректный email адрес')
    .required('Необходимо указать электронную почту')
    .label('Электронная почта'),

  text: Yup
    .string()
    .required('Необходимо ввести сообщение')
    .label('Сообщение')
});

const MyInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);

const Form = withNextInputAutoFocusForm(View);

class Feedback extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Обратная связь' />,
  };

  formSubmit(values, actions) {
    this.props.dispatch(sendLead(values, actions));
  }

  render() {
    const inputStyle = {
      textColor: dP.color.white,
      baseColor: '#ABABAB',
      tintColor: dP.color.accent,
      errorColor: dP.color.error,
    };

    const {accessToken, fullName, email, phone} = this.props;

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Formik
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            initialValues={{
              name: accessToken && fullName ? fullName : '',
              phone: accessToken && phone ? phone : '+',
              email: accessToken && email ? email : '',
              text: '',
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
                    name='text'
                    type='text'
                    {...inputStyle}
                  />
                  <Body style={{margin: 24}}>
                    {this.showError('sendLeadError')}
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

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({...state.api, ...state.auth, ...state.user});

export default connect(mapStateToProps)(Feedback);
