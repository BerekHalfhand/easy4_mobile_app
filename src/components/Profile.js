import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Screen from './Screen';
import {Button, Body, View, Container, Content, CheckBox } from 'native-base';
import StandardFooter from 'app/src/elements/Footer';
import {styles, dP} from 'app/utils/style/styles';
import {scaleTextToFit} from 'app/utils/scaling';
import {font} from 'app/utils/helpers';
import LogoTitle from 'app/src/elements/LogoTitle';
import NavigationService from 'app/src/services/NavigationService';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import autoBind from 'react-autobind';
import {login, changePassword, toggleDoNotPersist, esiaLink} from 'app/src/actions';
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
    password: Yup.string()
        .required('Необходимо указать текущий пароль'),
    newpassword: Yup.string()
        .required('Необходимо указать новый пароль'),
    retrypassword: Yup.string()
        .required('Необходимо повторить новый пароль'),
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
        headerTitle: <LogoTitle title='Смена пароля' />,
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
        const {dispatch, bioTouch, bioSaved} = this.props;
        if (bioSaved && bioTouch) {
            LocalAuthentication.authenticateAsync()
                .then(result => {
                    console.log('authenticateAsync', result);
                    if (result.success) {
                        Promise.all([
                            SecureStore.getItemAsync('login'),
                            SecureStore.getItemAsync('password')]
                        )
                            .then(credentials => dispatch(login(credentials[0], credentials[1])));
                    }
                });
        }
    }

    checkSaved = async () => {
        let savedPassword = await SecureStore.getItemAsync('password');
        let savedLogin = await SecureStore.getItemAsync('login');
        if (savedPassword && savedLogin) {
            console.log("!!!!!!!!!!!!!!! savedPassword: ", savedPassword);
            this.setState({savedPassword, savedLogin});
        }
    }

    formSubmit = values => {
        if(values.password === this.state.savedPassword && values.newpassword === values.retrypassword){
            console.log("!!!!!!!!!!!!!!!!! SecureStore: ", SecureStore);
            this.props.dispatch(changePassword(values.password, values.newpassword));
            this.props.dispatch(login(this.state.savedLogin, values.newpassword));
        }
    }

    renderContent() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Formik
                        onSubmit={(values) => this.formSubmit(values)}
                        validationSchema={validationSchema}
                        initialValues={{
                            login: '',
                            password: '',
                            newpassword: '',
                            retrypassword: ''
                        }}
                        render={formikProps => {
                            return (
                                <Form>
                                    {/*<MyInput*/}
                                    {/*    label='Телефон или электронная почта'*/}
                                    {/*    name='login'*/}
                                    {/*    type='email'*/}
                                    {/*    icon='person-outline'*/}
                                    {/*/>*/}
                                    <MyInput
                                        label='Текущий пароль'
                                        name='password'
                                        isPassword={true}
                                        icon='visibility-off'
                                        altIcon='visibility'
                                    />
                                    <MyInput
                                        label='Новый пароль'
                                        name='newpassword'
                                        isPassword={true}
                                        icon='visibility-off'
                                        altIcon='visibility'
                                    />
                                    <MyInput
                                        label='Повтор нового пароля'
                                        name='retrypassword'
                                        isPassword={true}
                                        icon='visibility-off'
                                        altIcon='visibility'
                                    />

                                    <Body style={{margin: 24}}>
                                        {this.showError('loginError')}
                                        {this.props.busy && (this.props.busy.login || this.props.busy.msisdns) ? (
                                            <ActivityIndicator />
                                        ) : (
                                            <View>
                                                <Button full rounded
                                                        style={{...styles.buttonPrimary, marginBottom: 16}}
                                                        onPress={formikProps.handleSubmit}
                                                >
                                                    <Text style={styles.textButtonPrimary}>
                                                        Сменить пароль
                                                    </Text>
                                                </Button>
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
