import React from 'react';
import Screen from './Screen';
import { Text, ActivityIndicator } from 'react-native';
import {Button, Body, Form, Container, Content } from 'native-base';
import {styles, stylesExtra} from 'app/utils/style/styles';
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
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
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
                    {...stylesExtra.input}
                  />
                  <Body style={{margin: 24}}>
                    {this.showError('restorePasswordError')}
                    {this.props.busy && this.props.busy.recovery ? (
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

const mapStateToProps = state => state.api;

export default connect(mapStateToProps)(Recovery);
