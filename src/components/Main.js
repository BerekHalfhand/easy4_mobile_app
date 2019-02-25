import React from 'react';
import {TextInput, Image, StatusBar, View, Navigator, Text, Dimensions, Platform, PixelRatio, Modal, Alert, TouchableHighlight} from 'react-native';
import Screen from "./Screen";
import {Button, Container, Footer, FooterTab,
    Icon,
    Content, Body, Header, Title, ListItem, List, Left, Right, Switch, Form, Picker} from 'native-base';
// import { Icon } from 'react-native-vector-icons';
import {styles, dP} from "../../utils/style/styles";
import StandartFooter from '../elements/Footer';
import ClientMainBalance from '../elements/ClientMainBalance';
import ClientMainInfo from '../elements/ClientMainInfo';

class LogoTitle extends React.Component {
    render() {
      return (
        <View style={{ backgroundColor:'#004d99' }}>
            <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:20}}>+7(123)333 4455</Text>
            <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:13}}>Константинов Константин</Text>
        </View>
      );
    }
  }

export default class Main extends Screen{
    constructor(props){
        super(props);
        this.state = {
            clientBalanceChecked: true,
            clientBalance: 110,
            selected: "key1",
            modalVisible: false,
            fake: {
                name: 'Константин Константинович',
                count: 6
            }
        }

    }

    static navigationOptions = {
        title: 'Главная',
        headerTitle: <LogoTitle />,
        // {
        //     backgroundColor: '#004d99',
        //   },
            headerStyle: {
                backgroundColor:'#004d99',
            },
          headerTintColor: '#fff',
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //   },
      };
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      renderModalAcquiring(){
          return(
            <Form>
                <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
                >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
                </Picker>
            </Form>
          )
      }
      

    render() {
        // const clientBalance = this.state.clientBalanceChecked ? this.state.clientBalance : '';
        return(
                <Container style={{backgroundColor:'#004d99'}}>
                    <Modal
                        animationType="slide"
                        presentationStyle="overFullScreen"
                        
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{backgroundColor:'rgba(0,0,0,.5)'}}>
                            <View style={{margin:10}}>
                                <View style={{marginBottom:10}}>
                                    <TouchableHighlight
                                        onPress={() => {
                                        return true
                                        }}>
                                        <Button block light><Text>Банковская карта</Text></Button>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        onPress={() => {
                                        return true
                                        }}>
                                        <Button block light><Text>Онлайн банк</Text></Button>
                                    </TouchableHighlight>
                                </View>
                                


                                <TouchableHighlight
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Button block light><Text>Отмена</Text></Button>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    {/* <View style={{alignContent:'center', backgroundColor:'#004d99'}}>
                        <Text style={{margin:0, padding:0, textAlign:'center', color:'white'}}>{this.state.fake.name}</Text>

                    </View> */}
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
                                                    onPress={() => this.setModalVisible(true)}
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
                        <ListItem icon style={{height:56}}>
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
                            {/* <Switch value={false} /> */}
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

                        <ListItem icon style={{height:56}}>
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
        )
    }
}
