import React from 'react';
// import {Text, Image,
//     // StatusBar,
//     View
// } from 'react-native';
import {Icons} from 'react-native-fontawesome';
import {Font, AppLoading} from 'expo';

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
import { Image } from 'react-native'
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
        title: '',
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
    componentWillMount() {
        // StatusBar.setHidden(true);
    }

    componentDidMount() {
        
        Font.loadAsync({
            'SFCompact Text': require('../../assets/fonts/SFCompactText-LightItalic.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    render() {
        // return(
        //     <Container>
        //         <Header>
        //             <Left>
        //                 <Button transparent>
        //                     <Icon name='menu' />
        //                 </Button>
        //             </Left>
        //             <Body>
        //             <Title>Header</Title>
        //             </Body>
        //             <Right />
        //         </Header>
        //         <Content>
        //             <Text>
        //                 This is Content Section
        //             </Text>
        //         </Content>
        //         <Footer>
        //             <FooterTab>
        //                 <Button full>
        //                     <Text>Footer</Text>
        //                 </Button>
        //             </FooterTab>
        //         </Footer>
        //     </Container>
        // )

        return (
        
            <Container>
                <Content padder style={{backgroundColor: dP.color.primary}}>
                    <Body style={{ justifyContent: "center", marginTop: 92}}>
                        <Image source={require('../../assets/image/logo-w100.png')}/>
                    </Body>
                    <Body style={{marginTop: 24}}>
                        <Text style={styles.whiteTextColorH}>Добро пожаловать в Easy4</Text>
                    </Body>
                    <Body style={{marginTop: 24}}>
                        <Text style={styles.whiteTextColor}>Самое удобное приложение в мире</Text>
                        <Text style={styles.whiteTextColor}>среди приложений для приложений</Text>
                    </Body>
                    <Body style={{marginTop: 48}}>
                        <Button full rounded
                                style={styles.buttonPrimary}
                                onPress={() => this.props.navigation.navigate('Login')}
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
                                Создать аккаунт
                            </Text>
        
                        </Button>
                    </Body>
        
                    <Body style={{flexDirection: "row", justifyContent: "center", marginTop: 60}}>
                        <CheckBox checked={true}
                                  onPress={this.chkbox_check}
                                  style={styles.checkbox}
                        />
                        <Text style={{color: '#ffffff', marginLeft: 12}}>Договор оферты</Text>
                    </Body>
                </Content>
                <StandartFooter />
            </Container>
        
        );
    }
}
