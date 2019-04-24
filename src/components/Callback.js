import React from 'react';
import Screen from './Screen';
import { Text, ActivityIndicator, Platform } from 'react-native';
import {Button, Body, Form, Content, Container } from 'native-base';
import {styles, stylesExtra} from 'app/utils/style/styles';
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

  formSubmit(values, actions) {
    values.from = Platform.OS === 'ios' ? 2 : 1;
    values.lead_type = 1;
    this.props.dispatch(sendLead(values, actions));
  }

  renderContent() {
    const {accessToken, fullName, phone} = this.props;

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
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
                    {...stylesExtra.input}
                  />
                  <TextInputMask
                    customTextInput={TextField}
                    customTextInputProps={stylesExtra.input}
                    placeholder='+'
                    label='Телефон'
                    style={{color: 'white'}}
                    type='cel-phone'
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
                    {this.showError('sendLeadError')}
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator />
                    ) : (
                      <Button full rounded
                        style={styles.buttonPrimary}
                        onPress={formikProps.handleSubmit}
                      >
                        <Text style={styles.textButtonPrimary}>
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
