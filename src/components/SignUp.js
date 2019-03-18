import React from 'react';
import {Alert, ActivityIndicator, Dimensions, Platform, Text, KeyboardAvoidingView, Keyboard, ScrollView} from 'react-native';
import Screen from './Screen';
import {Button, Body, Form } from 'native-base';
// import FingerPrint from './touchid';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputScrollable from 'app/src/elements/InputScrollable';
import Api from 'app/utils/api';
import { Formik } from 'formik';
import * as yup from 'yup';
import { wrapScrollView } from 'react-native-scroll-into-view';

const CustomScrollView = wrapScrollView(ScrollView);

const phoneRegEx = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    // .required('Необходимо указать имя')
    .label('Имя'),

  secondName: yup
    .string()
    .label('Отчество'),

  lastName: yup
    .string()
    // .required('Необходимо указать фамилию')
    .label('Фамилия'),

  phone: yup
    .string().matches(phoneRegEx, 'Неправильный формат')
    // .required('Необходимо указать номер телефона')
    .label('Номер телефона'),

  email: yup
    .string()
    .email('Некорректный email адрес')
    .required('Необходимо указать электронную почту')
    .label('Электронная почта'),

  password: yup
    .string()
    .required('Необходимо указать пароль')
    .min(6, 'Пароль должен быть длиннее пяти символов')
    .label('Пароль'),
});



export default class SignUp extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Регистрация' />,
  };

  static fetchAuthData(){
    return true;
  }

  formSubmit(values, actions) {
    console.log('form submit');

    Api.signup(
      values.firstName,
      values.secondName,
      values.lastName,
      values.email,
      values.phone,
      values.password
    )
      .then(data => {
        console.log('data:', data);

        if (!data._id)
          if (data.errors)
            throw {title: data.msg, message: data.errors[0].message};
          else
            throw {title: 'Sign Up error', message: data.msg};

      })
      .then(data => {
        console.log('redirect to login');
        this.props.navigation.navigate('Login');
      })
      // .catch(e => Alert.alert(e.title, e.message));
      .catch(e => actions.setFieldError('general', e.message))
      .finally(() => actions.setSubmitting(false));
  }

  render(data) {
    // TODO: fix that pesky scroll bug on IOS

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 64
    // const { height } = Dimensions.get('window');
    // let viewStyle = { flex: 1, padding: 24 };
    //
    // if (Platform.OS === 'ios')
    //   viewStyle.maxHeight = height;

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
          >
            {formikProps => (
              <React.Fragment>

                <InputScrollable label='Имя' formikKey='firstName' formikProps={formikProps} />
                <InputScrollable label='Фамилия' formikKey='lastName' formikProps={formikProps} />
                <InputScrollable label='Отчество' formikKey='secondName' formikProps={formikProps} />
                <InputScrollable label='Электронная почта' formikKey='email' keyboardType='email-address' formikProps={formikProps} />
                <InputScrollable label='Номер телефона' formikKey='phone' keyboardType='phone-pad' formikProps={formikProps} />
                <InputScrollable label='Пароль' formikKey='password' isPassword={true} icon='visibility-off' altIcon='visibility' formikProps={formikProps} />

                <Text style={{ color: dP.color.error }}>{formikProps.errors.general}</Text>
                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Body style={{margin: 24}}>
                    <Button full rounded
                      style={styles.buttonPrimary}
                      onPress={formikProps.handleSubmit}
                    >
                      <Text style={{fontFamily:'SFCT_Semibold', letterSpacing:0.25, fontSize:16, color:'#005eba'}}>
                        Создать аккаунт
                      </Text>
                    </Button>
                  </Body>
                )}
              </React.Fragment>
            )}
          </Formik>

        </KeyboardAvoidingView>
      </CustomScrollView>
    );
  }
}
