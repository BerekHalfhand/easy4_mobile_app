import React from 'react';
import Screen from './Screen';
import { Alert, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Button, Body, Form } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { sendLead } from 'app/src/actions';
import {
  handleTextInput
} from 'react-native-formik';
import * as Yup from 'yup';
import { TextField } from 'react-native-material-textfield';
import { TextInputMask } from 'react-native-masked-text';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Необходимо указать телефон')
});

const MyInput = handleTextInput(TextField);

class Feedback extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Перезвонить мне' />,
  };

  formSubmit(values, actions){
    this.props.dispatch(sendLead(values, actions));
  }

  render() {
    const inputStyle = {
      textColor: dP.color.white,
      baseColor: '#ABABAB',
      tintColor: dP.color.accent,
      errorColor: dP.color.error,
    };

    const error = (this.props.errors && this.props.errors.sendLeadError ?
      (<Text style={{ color: dP.color.error, marginBottom: 10 }}>
        {this.props.errors.sendLeadError}
      </Text>) : null );

    const {accessToken, fullName, phone} = this.props;

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
              name: accessToken && fullName ? fullName : '',
              phone: accessToken && phone ? phone : '+',
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
                      /**
                       * mask: (String | required | default '')
                       * the mask pattern
                       * 9 - accept digit.
                       * A - accept alpha.
                       * S - accept alphanumeric.
                       * * - accept all, EXCEPT white space.
                      */
                      withDDD: true,
                      dddMask: '+9 (999) 999-99-99'
                    }}
                    value={formikProps.values.phone}
                    onChangeText={text => formikProps.setFieldValue('phone', text)}
                  />
                  <Body style={{margin: 24}}>
                    {error}
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

const mapStateToProps = state => ({...state.api, ...state.auth, ...state.user});

export default connect(mapStateToProps)(Feedback);
