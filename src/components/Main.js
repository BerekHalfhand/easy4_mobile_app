import React from 'react';
import {TextInput, Image, StatusBar, View, Navigator, Text, Dimensions, Platform, PixelRatio, Modal, Alert, TouchableHighlight} from 'react-native';
import Screen from "./Screen";
import {Button, Container, Footer, FooterTab,
    Root,
    Icon,
    ActionSheet,
    Content, Body, Header, Title, ListItem, List, Left, Right, Switch, Form, Picker} from 'native-base';
import {styles, dP} from "../../utils/style/styles";
import StandartFooter from '../elements/Footer';
import ClientMainBalance from '../elements/ClientMainBalance';
import ClientMainInfo from '../elements/ClientMainInfo';
import LogoTitle from '../elements/LogoTitle';

// class LogoTitle extends React.Component {
//     render() {
//       return (
//         <View style={{ backgroundColor:'#004d99' }}>
//             <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:20}}>+7(123)333 4455</Text>
//             <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:13}}>Константинов Константин</Text>
//         </View>
//       );
//     }
//   }

export default class Main extends Screen{
    constructor(props){
        super(props);
        this.state = {
            clientBalanceChecked: true,
            clientBalance: 110,
            clicked:'',
            fake: {
                name: 'Константин Константинович',
                phone: '+7(123)456 78 98',
                count: 6,
                props: props
            }
        }

    }

    static navigationOptions = {
        title: 'Главная',
        headerTitle: navigation  =>  <LogoTitle
                titleSize={20}
                subTitleSize={13}
                title='+7(123)456 78 98'
                subTitle='Константин Константинович'
            />,

            headerStyle: {
                backgroundColor:'#004d99',
            },
          headerTintColor: '#fff',

      };


    render() {
        const BUTTONS = ["Банковская карта", "Онлайн банк", "Отмена"];
        const DESTRUCTIVE_INDEX = 3;
        const CANCEL_INDEX = 2;
        console.log('state:', this.state);
        console.log('navigation:', this.props);
        return(
            <Root>
                <Container style={{backgroundColor:'#004d99'}}>

                    <Image
                        style={{width: '100%', zIndex:-3, position:'absolute'}}
                        source={require('../../assets/image/bitmap.png')}
                    />
                    <Content style={{ width: '100%', padding:24, marginTop:30}}>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width:'60%'}}>
                                <ClientMainBalance />
                            </View>
                            <View style={{width:'40%', alignItems:'flex-end'}}>
                                <View style={{flex: 1, justifyContent: "flex-end", alignContent:'center'}}>
                                    <Button  rounded
                                             style={styles.buttonPrimaryCash}
                                             onPress={() =>
                                                 ActionSheet.show(
                                                     {
                                                         options: BUTTONS,
                                                         cancelButtonIndex: CANCEL_INDEX,
                                                         destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                         // title: "Testing ActionSheet"
                                                     },
                                                     buttonIndex => {
                                                         this.setState({ clicked: BUTTONS[buttonIndex] });
                                                     }
                                                 )}
                                    >
                                        <Text style={styles.buttonPrimaryText}>
                                            Пополнить
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                        </View>

                        {/* Count Client MSISDN */}
                        <View style={{marginBottom:50}}>
                            <View style={{flex: 1, flexDirection: 'row', marginTop:40, height:24}}>
                                <View >
                                    <Text style={{fontSize:13, color:'#FFFFFF', lineHeight:24}}>
                                        {this.state.fake.count}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{marginLeft:5, fontSize:13, color:'#FFFFFF', lineHeight:24}}>
                                        номеров на аккауне
                                    </Text>
                                </View>
                                <View>
                                    <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24, lineHeight:24, marginLeft:8}}/>
                                </View>
                            </View>
                        </View>
                        {/* *** */}

                        {/* Info Block */}

                        <ClientMainInfo />

                        {/* *** */}

                        {/* List Options */}
                        <View style={{marginLeft:-14}}>
                            <ListItem icon style={{height:56}}
                                      onPress={() => this.props.navigation.navigate('Tariff')}
                            >
                                <Left>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon active name="airplane" />
                                    </Button>
                                </Left>
                                <Body style={{height:56}}>
                                <Text style={{color:'#FFFFFF', fontSize:16, lineHeight:56, height:56}}>Тариф</Text>
                                </Body>
                                <Right style={{height:56}}>
                                    <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24}} />
                                </Right>
                            </ListItem>

                            <ListItem icon style={{height:56}}>
                                <Left>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon active name="airplane" />
                                    </Button>
                                </Left>
                                <Body style={{height:56}}>
                                <Text style={{color:'#FFFFFF', fontSize:16, lineHeight:56, height:56}}>Квоты</Text>
                                </Body>
                                <Right style={{height:56}}>
                                    <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24}}/>
                                    {/* <Switch value={false} /> */}
                                </Right>
                            </ListItem>

                            <ListItem icon style={{height:56}}
                                      onPress={() => this.props.navigation.navigate('IncreaseBalance')}
                            >
                                <Left style={{height:56}}>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon active name="airplane" />
                                    </Button>
                                </Left>
                                <Body style={{height:56}}>
                                <Text style={{color:'#FFFFFF', fontSize:16, lineHeight:56, height:56}}>Расходы</Text>
                                </Body>
                                <Right style={{height:56}}>
                                    <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24, lineHeight:24, }} />
                                    {/* <Switch value={false} /> */}
                                </Right>
                            </ListItem>
                        </View>


                        {/* *** */}
                    </Content>
                    <StandartFooter />
                </Container>
            </Root>

        )
    }
}
