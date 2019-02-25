import React from 'react';
import {TextInput, Image, StatusBar, View, Navigator, Text} from 'react-native';
import Screen from "./Screen";
import {Button, Container, Footer, FooterTab, Icon, Content, Body, Form, Item, Input, IconNB } from 'native-base';
import FingerPrint from './touchid';
// import { Expo, Fingerprint } from 'expo';
import {styles, dP} from "../../utils/style/styles";

export default class Home extends Screen {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            user: '',
            passwd: '',
            fake: {
                masterPhone: '+7 (999) 111 22 33',
                name: 'Константин Константинович'
            }
        };
    }

    static navigationOptions = {
        title: 'Вход',
      };

    onPressLogin(){
        // let validData = Home.fetchAuthData();
        // if (validData){
        console.log('press login button');
        const fetchAuth = Home.fetchAuthData();
        this.setState(previousState => ({
            auth: fetchAuth

        }))
        // } else {
        //     this.setState({
        //         error: 'Не удачная авторизация'
        //     })
        // }

    }

    // onHandlerUser(e){
    //     console.log('e', e);
    //     let prevStateUser = this.state.user;
    //     this.setState({
    //         user: e.nativeEvent.text+prevStateUser
    //     })
    // }
    componentDidMount() {
        // let hasHardwareAsync = Expo.FaceDetector()
    }

    static fetchAuthData(){
        return true
    }
    render(data) {
        // if (){
        //     return(
        //         <Container>
        //             <Content>
        //                 <Text>
        //                     {this.state.error }
        //                 </Text>
        //             </Content>
        //         </Container>
        //     )
        // }
        console.log('state: ', this.state);
        return (
            <Container>
                {/* <StatusBar
                    barSryle={'light-content'}
                /> */}
                
                <Content style={{backgroundColor: dP.color.primary, paddingTop: '50%', padding:24}}>
                <FingerPrint/>
                        <Form>
                                <Input placeholder="Введите имя" style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:1}} placeholderTextColor={'#ABABAB'}
                                       onChangeText={(user) => this.setState({user})}
                                       value={this.state.user}
                                />
                                <Input placeholder="Введите пароль" style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:1}} placeholderTextColor={'#ABABAB'}
                                       onChangeText={(passwd) => this.setState({passwd})}
                                       value={this.state.passwd}
                                />
                        </Form>
                    <Body style={{marginTop: 48}}>
                    <Button full rounded
                            style={styles.buttonPrimary}
                            // onPress={() => ( this.onPressLogin() ? this.props.navigation.navigate('Main') : null )}
                            onPress={() => this.props.navigation.navigate('Main')}
                    >
                        <Text style={styles.buttonPrimaryText}>
                            Войти
                        </Text>
                    </Button>
                    </Body>
                    <Body style={{marginTop: 12}}>
                    <Button full transparent rounded
                            style={styles.buttonPrimaryInverse}
                            onPress={this.onPressRegister}
                    >
                        <Text style={styles.buttonPrimaryInverseText} align='center'>
                            Забыли пароль?
                        </Text>

                    </Button>
                    </Body>
                </Content>
                <Footer style={{backgroundColor: '#FED657'}}>
                    <FooterTab>
                        <Button>
                            {/*<FontAwesome>{Icons.chevronLeft}</FontAwesome>*/}
                            <Icon name="ios-grid"/>
                        </Button>
                        <Button>
                            <Icon name="ios-grid"/>
                        </Button>
                        <Button>
                            <Icon name="ios-grid"/>
                        </Button>
                        <Button>
                            <Icon name="ios-grid"/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}
