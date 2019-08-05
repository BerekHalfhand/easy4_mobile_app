import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import Screen from './Screen';
import {Button, Body, View, Container, Content} from 'native-base';
import StandardFooter from 'app/src/elements/Footer';
import {styles, stylesExtra, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import { TextField } from 'react-native-material-textfield';
import { TextInputMask } from 'react-native-masked-text';
import autoBind from 'react-autobind';
import {iccidInfo} from 'app/src/actions';
import {padding} from 'app/utils/helpers';
import { Formik } from 'formik';
import {scaleTextToFit} from 'app/utils/scaling';
import {font, checkNested} from 'app/utils/helpers';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {handleTextInput} from 'react-native-formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  iccid: Yup
    .number()
    .typeError('Укажите номер')
    .required('Необходимо указать номер')
    .positive('Номер должен быть положителен')
    .test('len', 'Номер должен быть ровно 19 символов в длину', val => val.toString().length === 19)
    .label('Iccid'),

  phone: Yup.string()
    .required('Необходимо указать телефон')
});

const MyInput = handleTextInput(TextField);

class BindIccid extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Привязать SIM-карту' />,
  };

  formSubmit(values) {
    console.log('form submit', values);
    if (!checkNested(this.props, 'userId'))
      return false;

    let msisdn = values.phone.replace(/\D/g,'');
    this.props.dispatch(iccidInfo(values.iccid, msisdn, this.props.userId));
  }

  renderContent() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content}>
          <Formik
            initialValues={{
              iccid: '',
              phone: ''
            }}
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            render={formikProps => {
              return (
                <View>
                  <MyInput
                    label='Iccid'
                    name='iccid'
                    keyboardType='numeric'
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
                    {this.showError('iccidBindError')}
                    {this.showError('iccidInfoError')}
                    {checkNested(this.props, 'busy') &&
                      ( this.props.busy.iccidInfo ||
                        this.props.busy.iccidBind ||
                        this.props.busy.iccidUnbind
                      ) ? (
                        <ActivityIndicator />
                      ) : (
                        <Button full rounded
                          style={{...styles.buttonPrimary, ...padding(10, 5)}}
                          onPress={formikProps.handleSubmit}
                        >
                          <Text style={font('SFCT_Semibold', scaleTextToFit(16, 0.5, 'Привязать'), dP.color.primary, 0.25)}>
                            Привязать
                          </Text>
                        </Button>
                      )}
                  </Body>

                </View>
              );
            }}
          />
        </Content>
        <StandardFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => ({...state.api, ...state.user});

export default connect(mapStateToProps)(BindIccid);
