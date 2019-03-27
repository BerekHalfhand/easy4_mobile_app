import React from 'react';
import Screen from './Screen';
import { Alert, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Button, Body, Form } from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import { Formik } from 'formik';
import {
  handleTextInput
} from 'react-native-formik';
import * as Yup from 'yup';
import { TextField } from 'react-native-material-textfield';
import {restorePassword} from 'app/src/actions';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Необходимо указать email')
    .email('Необходимо указать корректный email')
});

const MyInput = handleTextInput(TextField);

class Recovery extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Сброс пароля' />,
  };

  formSubmit(values, actions){
    console.log('form submit', values);
    const { dispatch } = this.props;
    dispatch(restorePassword(values.email));
  }

  render() {
    const error = (<Text style={{ color: dP.color.error, marginBottom: 10 }}>
      {this.props.errors && this.props.errors.restorePasswordError}
    </Text>);

    return (
      <ScrollView style={{backgroundColor: dP.color.primary}}
        keyboardShouldPersistTaps='always' >
        <KeyboardAvoidingView
          keyboardVerticalOffset = {64}
          style = {{ flex: 1, padding: 24 }}
          behavior = "padding" >
          <Formik
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            initialValues={{
              email: '',
            }}
            render={formikProps => {
              return (
                <Form>
                  <MyInput
                    label='Электронная почта'
                    autoFocus
                    name='email'
                    type='email'
                    textColor={dP.color.white}
                    baseColor='#ABABAB'
                    tintColor={dP.color.accent}
                    errorColor={dP.color.error}
                  />
                  <Body style={{margin: 24}}>
                    {this.props.errors && this.props.errors.restorePasswordError ? error : null}
                    {this.props.busy && this.props.busy.recovery ? (
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

const mapStateToProps = state => state.api;

export default connect(mapStateToProps)(Recovery);
