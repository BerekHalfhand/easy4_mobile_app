import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import Screen from './Screen';
import {Button, Body, View, Container, Content} from 'native-base';
import StandardFooter from 'app/src/elements/Footer';
import {styles, stylesExtra, dP} from 'app/utils/style/styles';
import LogoTitle from 'app/src/elements/LogoTitle';
import { TextField } from 'react-native-material-textfield';
import autoBind from 'react-autobind';
import {bindIccid} from 'app/src/actions';
import {padding} from 'app/utils/helpers';
import { Formik } from 'formik';
import {scaleTextToFit} from 'app/utils/scaling';
import {font} from 'app/utils/helpers';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {handleTextInput} from 'react-native-formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  iccid: Yup
    .number('Необходимо указать номер')
    .required('Необходимо указать номер')
    .positive('Номер должен быть положителен')
    .test('len', 'Номер должен быть ровно 19 символов в длину', val => val.toString().length === 2)
    .label('Iccid'),
});

const MyInput = compose(
  handleTextInput
)(TextField);

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
    this.props.dispatch(bindIccid(values.iccid));
  }

  renderContent() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content}>
          <Formik
            initialValues={{
              iccid: '',
            }}
            onSubmit={(values, actions) => this.formSubmit(values, actions)}
            validationSchema={validationSchema}
            render={formikProps => {
              return (
                <View>
                  <MyInput
                    label='Iccid'
                    name='iccid'
                    type='number'
                    {...stylesExtra.input}
                  />

                  <Body style={{margin: 24}}>
                    {this.showError('bindIccidError')}
                    {this.props.busy && this.props.busy.bindIccid ? (
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

const mapStateToProps = state => state.api;

export default connect(mapStateToProps)(BindIccid);
