import React from 'react';
// import {Text, Image,
//     // StatusBar,
//     View
// } from 'react-native';
import {Icons} from 'react-native-fontawesome';
import {Font, AppLoading} from 'expo';
import LogoTitle from '../elements/LogoTitle';

import {
    Content,
    ListItem,
    CheckBox,
    Text,
    Body,
    Footer,
    FooterTab,
    Container,
    Icon,
    Header,
    Title,
    // Image,
//     Card,
//     CardItem,
//     Text,
//     Thumbnail,
    Left,
    Right,
//     Spinner,
    Button
} from 'native-base';
import { View, Image } from 'react-native'
import Screen from './Screen';
import {styles, dP} from '../../utils/style/styles';

import StandartFooter from '../elements/Footer'


export default class Home extends Screen {
    constructor(props) {
        super(props);
        this.state = {
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

    onPressEnter() {
        console.log('login');
    }

    onPressRegister() {
        console.log('register');
    }

    chkbox_check() {
        console.log('oferta checked')
    }

    render() {

        console.log('state:', this.state);
        if (this.state.fontLoaded){
            return (

                <Container>
                    <Content padder style={{backgroundColor: dP.color.primary}}>
                        <Body style={{ justifyContent: "center", marginTop: 92}}>
                        <Image source={require('../../assets/image/logo-w100.png')}/>
                        </Body>
                        <Body style={{marginTop: 24}}>
                        <Text style={{fontFamily:"SFCT_Medium", letterSpacing:-0.5, fontSize:24, color:"#FFFFFF"}}>Добро пожаловать в Easy4</Text>
                        </Body>
                        <Body style={{marginTop: 24}}>
                        <Text style={{fontFamily:"SFCT_Regular", letterSpacing:-0.25, fontSize:16, color:'#FFFFFF'}}>Самое удобное приложение в мире</Text>
                        <Text style={{fontFamily:"SFCT_Regular", letterSpacing:-0.25, fontSize:16, color:'#FFFFFF'}}>среди приложений для приложений</Text>
                        </Body>
                        <Body style={{marginTop: 48}}>
                        <Button full rounded
                                style={styles.buttonPrimary}
                                onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text style={{fontFamily:"SFCT_Semibold", letterSpacing:0.25, fontSize:16, color:"#005eba"}}>
                                Войти
                            </Text>
                        </Button>
                        </Body>
                        <Body style={{marginTop: 12}}>
                        <Button full transparent rounded
                                style={styles.buttonPrimaryInverse}
                                onPress={() => this.props.navigation.navigate('newAccaunt')}
                        >
                            <Text style={{fontFamily:'SFCT_Semibold',letterSpacing:0.29, color:'#FED657'}} align='center'>
                                Создать аккаунт
                            </Text>

                        </Button>
                        </Body>

                        <Body style={{flexDirection: "row", justifyContent: "center", marginTop: 60}}>
                        <CheckBox checked={true}
                                  onPress={this.chkbox_check}
                                  style={styles.checkbox}
                        />
                        <View style={{marginLeft: 12}}>
                            <Text style={{fontFamily:'SFCT_Regular',letterSpacing:-.025, color: '#ffffff'}}>Договор оферты</Text>
                        </View>
                        </Body>
                    </Content>
                    <StandartFooter />
                </Container>

            );
        }
        return(
            <Container>
                <Content padder style={{backgroundColor: dP.color.primary}}></Content>
            </Container>
        )


    }
}
