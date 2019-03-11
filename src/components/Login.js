import React from 'react';
import { Text, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import Screen from "./Screen";
import {Button, Container, Content, Body, Form, Input, IconNB, TouchableOpacity } from 'native-base';
import {styles, dP} from "../../utils/style/styles";
import LogoTitle from '../elements/LogoTitle';
import StandardFooter from "../elements/Footer";
import PasswordInputText from "react-native-hide-show-password-input";
import { TextField } from 'react-native-materialui-textfield';

export default class Login extends Screen {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            login: '',
            password: '',
            fake: {
                masterPhone: '+7 (999) 111 22 33',
                name: 'Константин Константинович'
            },
            compatible: false,
            fontLoaded: false,
        };
    }

    static navigationOptions = {
        title: 'Назад',
        headerTitle: navigation  =>  <LogoTitle
            titleSize={20}
            subTitleSize={13}
        />,

        headerStyle: {
            backgroundColor:'#004d99',
        },
        headerTintColor: '#fff',

    };

    componentDidMount() {
        // this.checkDeviceForHardware();
    }


    static fetchAuthData(){
        return true
    }

    formSubmit(){
        console.log('form submit');
        fetch('http://192.168.3.101:8080/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: this.state.login,
                password: this.state.password
            }),
        })
            .then(response => {
                response.json();
                console.log('response:',response);
            })
            // .then(data =>
            //     this.setState({
            //     accessToken:data.accessToken,
            //     refreshToken:data.refreshToken
            // })
                    .then(data => {
                        AsyncStorage.setItem(
                            'accessToken',data.accessToken
                        );
                        AsyncStorage.setItem(
                            'refreshToken',data.refreshToken
                        );

                    }

            );

           //TODO  to finish registration and login, sae data in storage
    }

    render(data) {

        console.log('state: ', this.state);
        // if (this.state.fontLoaded) {
            return (
                <KeyboardAvoidingView
                    keyboardVerticalOffset = {64} // adjust the value here if you need more padding
                    style = {{ flex: 1 }}
                    behavior = "padding" >

                    <ScrollView contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        padding: 15
                    }}
                                keyboardShouldPersistTaps='always' >

                        <Form>

                            <TextField
                                       label="Телефон или электронная почта"
                                       textColor={'#FFFFFF'}
                                       baseColor={'#ABABAB'}
                                       tintColor={'#FED657'}
                                       textContentType="username"
                                       onChangeText={(login) => this.setState({login})}
                                       value={this.state.login}
                            />
                            <PasswordInputText
                                textColor={'#FFFFFF'}
                                baseColor={'#ABABAB'}
                                tintColor={'#FED657'}
                                iconColor={'#FED657'}
                                value={this.state.password}
                                onChangeText={ (password) => this.setState({ password }) }
                            />

                        </Form>
                        <Body style={{marginTop: 48}}>
                        <Button full rounded
                                style={styles.buttonPrimary}
                                // onPress={() => this.formSubmit()}
                                onPress={() => this.props.navigation.navigate('Main')}
                        >
                            <Text style={{fontFamily:"SFCT_Semibold", letterSpacing:0.25, fontSize:16, color:"#005eba"}}>
                                Войти
                            </Text>
                        </Button>
                        </Body>
                        <Body style={{marginTop: 12}}>
                        <Button full transparent rounded
                                style={styles.buttonPrimaryInverse}
                                onPress={this.onPressRegister}

                        >
                            <Text style={{fontFamily:'SFCT_Semibold',letterSpacing:0.29, color:'#FED657', fontSize:16}} align='center'>
                                Забыли пароль?
                            </Text>

                        </Button>
                        </Body>

                    </ScrollView>
                </KeyboardAvoidingView>
            )
        // }
        // return(
        //     <Container>
        //         <Content padder style={{backgroundColor: dP.color.primary}}></Content>
        //     </Container>
        // )
    }
}
