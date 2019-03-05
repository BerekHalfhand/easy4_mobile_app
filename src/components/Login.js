import React from 'react';
import {TextInput, Image, StatusBar, View, Navigator, Text} from 'react-native';
import Screen from "./Screen";
import {Button, Container, Footer, FooterTab, Icon, Content, Body, Form, Item, Input, IconNB, TouchableOpacity } from 'native-base';
// import FingerPrint from './touchid';
import Expo, { Constants } from 'expo';
import {styles, dP} from "../../utils/style/styles";
import LogoTitle from '../elements/LogoTitle';
import StandartFooter from "../elements/Footer";

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
            .then(response => response.json())
            .then(data => this.setState({ data }));

           //TODO  to finish registration and login, sae data in storage
    }

    render(data) {

        console.log('state: ', this.state);
        // if (this.state.fontLoaded) {
            return (
                <Container>
                    <Content style={{backgroundColor: dP.color.primary, paddingTop: '50%', padding: 24}}>
                        <Form>
                            <Input placeholder="Телефон или электронная почта"
                                   style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, color: '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                                   placeholderTextColor={'#ABABAB'}
                                   onChangeText={(login) => this.setState({login})}
                                   value={this.state.login}
                            />
                            <Input placeholder="Пароль"
                                   style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, 'color': '#FFFFFF', borderBottomColor: '#ABABAB', borderBottomWidth: 1}}
                                   placeholderTextColor={'#ABABAB'}
                                   onChangeText={(password) => this.setState({password})}
                                   value={this.state.password}
                            />
                        </Form>
                        <Body style={{marginTop: 48}}>
                        <Button full rounded
                                style={styles.buttonPrimary}
                            // onPress={() => ( this.onPressLogin() ? this.props.navigation.navigate('Main') : null )}
                                onPress={() => this.formSubmit()}
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
                    </Content>
                    <StandartFooter/>
                </Container>
            )
        // }
        // return(
        //     <Container>
        //         <Content padder style={{backgroundColor: dP.color.primary}}></Content>
        //     </Container>
        // )
    }
}
