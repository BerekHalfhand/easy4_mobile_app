import React from 'react';
import {Alert, ActivityIndicator, Text, KeyboardAvoidingView, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Screen from './Screen';
import {Button, Body, Form } from 'native-base';
// import FingerPrint from './touchid';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import NavBack from 'app/src/elements/NavBack';
import Api from 'app/utils/api';
import { Formik } from 'formik';
import * as yup from 'yup';

const phoneRegEx = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Необходимо указать имя')
    .label('Имя'),

  secondName: yup
    .string()
    .label('Отчество'),

  lastName: yup
    .string()
    .required('Необходимо указать фамилию')
    .label('Фамилия'),

  phone: yup
    .string().matches(phoneRegEx, 'Неправильный формат')
    .required('Необходимо указать номер телефона')
    .label('Номер телефона'),

  email: yup
    .string()
    .email()
    .required('Необходимо указать электронную почту')
    .label('Электронная почта'),

  password: yup
    .string()
    .required('Необходимо указать пароль')
    .min(6, 'Пароль должен быть длиннее пяти символов')
    .label('Пароль'),
});

const FieldWrapper = ({ formikKey, formikProps, ...props }) => (
  <View>
    <InputWithIcon
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      {...props}
    />
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

FieldWrapper.propTypes = {
  formikKey: PropTypes.string,
  formikProps: PropTypes.object,
};

export default class SignUp extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerBackImage: <NavBack />,
    headerBackTitle: null,
    headerTitle: navigation  =>  <LogoTitle title='Регистрация' />,
    headerStyle: styles.baseHeader,
    headerTintColor: '#fff',
  };

  componentDidMount() {
    // this.checkDeviceForHardware();
  }


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
        actions.setSubmitting(false);

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
      .catch(e => Alert.alert(e.title, e.message));
  }

  render(data) {

    return (
      <ScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView
          keyboardVerticalOffset = {100}
          style = {{ flex: 1, padding: 24, height: '100%' }}
          behavior = "padding" >

          <Formik
            initialValues={{ firstName: '' }}
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
          >
            {formikProps => (
              <React.Fragment>

                <FieldWrapper label='Имя' formikKey='firstName' formikProps={formikProps} />
                <FieldWrapper label='Отчество' formikKey='secondName' formikProps={formikProps} />
                <FieldWrapper label='Фамилия' formikKey='lastName' formikProps={formikProps} />
                <FieldWrapper label='Электронная почта' formikKey='email' keyboardType='email-address' formikProps={formikProps} />
                <FieldWrapper label='Номер телефона' formikKey='phone' keyboardType='phone-pad' formikProps={formikProps} />
                <FieldWrapper label='Пароль' formikKey='password' isPassword={true} icon='visibility-off' altIcon='visibility' formikProps={formikProps} />

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
      </ScrollView>
    );
  }
}
