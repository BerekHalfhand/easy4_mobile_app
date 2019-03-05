import React from 'react';
import {TextInput, Image, StatusBar, View, Navigator, Text} from 'react-native';
import Screen from "./Screen";
import {Button, Container, Footer, FooterTab, Icon, Content, Body, Form, Item, Input, IconNB, TouchableOpacity } from 'native-base';
// import FingerPrint from './touchid';
import Expo, { Constants } from 'expo';
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
            },
            compatible: false,
        };
    }

    static navigationOptions = {
        title: 'Вход',
      };
    componentDidMount() {
        this.checkDeviceForHardware();
    }

    checkDeviceForHardware = async () => {
        let compatible = await Expo.Fingerprint.hasHardwareAsync();
        this.setState({ compatible });
        if (!compatible) {
            this.showIncompatibleAlert();
        } else {
            console.log('norm')
        }
    };
    showIncompatibleAlert = () => {
        this.dropdown.alertWithType(
            'error',
            'Incompatible Device',
            'Current device does not have the necessary hardware to use this API.'
        );
    };

    static fetchAuthData(){
        return true
    }
    checkDeviceForHardware = async () => {
        let compatible = await Expo.Fingerprint.hasHardwareAsync();
        this.setState({ compatible });
        if (!compatible) {
            this.showIncompatibleAlert();
        }
    };

    showIncompatibleAlert = () => {
        this.dropdown.alertWithType(
            'error',
            'Incompatible Device',
            'Current device does not have the necessary hardware to use this API.'
        );
    };
    checkForBiometrics = async () => {
        let biometricRecords = await Expo.Fingerprint.isEnrolledAsync();
        if (!biometricRecords) {
            this.dropdown.alertWithType(
                'warn',
                'No Biometrics Found',
                'Please ensure you have set up biometrics in your OS settings.'
            );
        } else {
            this.handleLoginPress();
        }
    };
    handleLoginPress = () => {
        if (Platform.OS === 'android') {
            this.showAndroidAlert();
        } else {
            this.scanBiometrics();
        }
    };

    showAndroidAlert = () => {
        Alert.alert('Fingerprint Scan', 'Place your finger over the touch sensor.');
        this.scanBiometrics();
    };

    scanBiometrics = async () => {
        let result = await Expo.Fingerprint.authenticateAsync('Biometric Scan.');
        if (result.success) {
            this.dropdown.alertWithType(
                'success',
                'You are you!',
                'Bio-Authentication succeeded.'
            );
        } else {
            this.dropdown.alertWithType(
                'error',
                'Uh oh!',
                'Bio-Authentication failed or canceled.'
            );
        }
    };
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
                {/*<FingerPrint/>*/}
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
                    <TouchableOpacity
                        onPress={
                            this.state.compatible
                                ? this.checkForBiometrics
                                : this.showIncompatibleAlert
                        }
                        >
                        <Text >
                            Bio Login
                        </Text>
                    </TouchableOpacity>

                    <Body style={{marginTop: 48}}>
                    <Button full rounded
                            style={styles.buttonPrimary}
                            // onPress={() => ( this.onPressLogin() ? this.props.navigation.navigate('Main') : null )}
                            onPress={() => this.props.navigation.navigate('Main', {
                                name: 'Константин Константинович',
                                phone: '+7(123)456 78 98',
                            }
                            )}
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
