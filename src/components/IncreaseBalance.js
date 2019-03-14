import React from 'react';
import {View, Text, Image, WebView} from 'react-native';
import {
  Root,
  Container,
  Content,
  Input,
  Form,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Right,
  ActionSheet
} from 'native-base';
import LogoTitle from '../elements/LogoTitle';
import NavBack from '../elements/NavBack';
import StandardFooter from '../elements/Footer';
import {styles} from '../../utils/style/styles';


// class LogoTitle extends React.Component {
//     render() {
//         return (
//             <View style={{ backgroundColor:'#004d99' }}>
//                 <Text style={{color:'#FFFFFF', textAlign:'center', fontSize:20}}>Управление расходами</Text>
//             </View>
//         );
//     }
// }

/**
 * Пополнение баланса
 */
export default class IncreaseBalance extends React.Component{
  constructor(props){
    super(props);
    const phone = props.navigation.state.params.phone;
    this.state = {
      phone: phone || '',
      amount: '500.02',
      card: '9999999999999999',
      webpay: true
    };
  }

    static navigationOptions = {
      headerBackImage: <NavBack />,
      headerBackTitle: null,
      headerTitle: navigation  =>  <LogoTitle title='Пополнение баланса' />,
      headerStyle: styles.baseHeader,
      headerTintColor: '#fff',
    };

    handleClickPhoneSelect(idx){
      console.log('Выбран номер телефона с индексом:', idx);

    }
    handleClickCardSelect(cardsButtonArray, idx){
      console.log('Выбрана карта с индексом:', idx);
      switch (idx) {
      case (cardsButtonArray.length-2):
        console.log('Выбрана опция добавления новой карты, индекс массива:', idx);
        break;
      }

    }
    renderNewCard(){
      return(
        <View style={{backgroundColor:'#005eba', marginTop:24, borderRadius:16}}>
          <Image
            style={{width: '100%', position: 'absolute'}}
            source={require('../../assets/image/earthmap.png')}
          />
          <View style={{paddingHorizontal:32, paddingTop: 40}}>
            <Input style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:1, fontSize: 16}} placeholderTextColor={'#ABABAB'}
              onChangeText={(newCardNumber) => this.setState({newCardNumber})}
              value={this.state.newCardNumber}
              placeholder={'Номер карты'}
            />
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 16, paddingHorizontal:32}}>
            <View style={{width:'50%', paddingRight:12}}>
              <Input style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:1, fontSize: 16}} placeholderTextColor={'#ABABAB'}
                onChangeText={(newCardDate) => this.setState({newCardDate})}
                value={this.state.newCardDate}
                placeholder={'мм/гг'}
              />
            </View>
            <View style={{width:'50%', paddingLeft: 12}}>
              <Input style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:1, fontSize: 16}} placeholderTextColor={'#ABABAB'}
                onChangeText={(newCardCVC) => this.setState({newCardCVC})}
                value={this.state.newCardCVC}
                placeholder={'CVV/CVC'}
              />
            </View>
          </View>

          <View style={{marginBottom: 24, paddingHorizontal: 32}}>
            <Input style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:1, fontSize: 16}} placeholderTextColor={'#ABABAB'}
              onChangeText={(newCardHolder) => this.setState({newCardHolder})}
              value={this.state.newCardHolder}
              placeholder={'Владелец карты'}
            />
          </View>
        </View>
      );
    }
    render() {
      const PHONE_BUTTONS = ['+7(699)321 2222', '+7(699)321 1111', 'Отмена'];
      // const DESTRUCTIVE_INDEX = 3;
      const CANCEL_INDEX = 2;
      const CARD_BUTTONS = ['1234123412341234', '7984798479847894', 'Новая карта', 'Отмена'];
      // const CARD_DESTRUCTIVE_INDEX = 3;
      const CARD_CANCEL_INDEX = 3;
      if (this.state.webpay){
        return(
          <Container  style={{backgroundColor:'#004d99'}}>
            <WebView
              source={{uri: 'https://easy4.pro/balance/index_app.php?msisdn='+this.state.phone+'&amount=100'}}
            />
          </Container>
        );
      }
      return(
        <Container style={{backgroundColor:'#004d99'}}>
          <Content padder>

            {/*Выбор номера телефона*/}

            <View style={{marginTop: 38}}>
              <ListItem icon style={{height:56, marginLeft: 0}}>

                <Body style={{height:56}}>
                  <Input style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:0, fontSize: 16}} placeholderTextColor={'#ABABAB'}
                    onChangeText={(phone) => this.setState({phone})}
                    value={this.state.phone}
                  />
                </Body>
                <Right style={{height:56}}>
                  <Icon active name="arrow-down" style={{color:'#FED657', fontSize:24}}
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: PHONE_BUTTONS,
                          cancelButtonIndex: CANCEL_INDEX,
                          // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                          // title: "Testing ActionSheet"
                        },
                        phoneIndex => {
                          this.setState({ phone: PHONE_BUTTONS[phoneIndex] });
                          this.handleClickPhoneSelect(phoneIndex);
                        }
                      )}
                  />
                </Right>
              </ListItem>
            </View>

            <View style={{flex: 1, flexDirection: 'row', marginTop: 16}}>
              <View style={{width:'50%', paddingRight: 5}}>
                <ListItem icon style={{height:56, marginLeft: 0}}>
                  <Body style={{height:56}}>
                    <Input style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:0, fontSize: 16}} placeholderTextColor={'#ABABAB'}
                      onChangeText={(amount) => this.setState({amount})}
                      value={this.state.amount}
                    />
                  </Body>
                  <Right style={{height:56}}>
                    <Icon active name="arrow-down" style={{color:'#FED657', fontSize:24}} />
                  </Right>
                </ListItem>
              </View>
              <View style={{width:'50%',  alignItems:'center', justifyContent: 'center', paddingLeft: 5}}>
                <Text style={{fontSize:13, color: '#ABABAB'}}>
                                    от 10 до 15000 р
                </Text>
              </View>
            </View>

            {/*Выбор карты*/}

            <View style={{marginTop: 16}}>
              <ListItem icon style={{height:56, marginLeft: 0}}>

                <Body style={{height:56}}>
                  <Input disabled  style={{'color':'#FFFFFF', borderBottomColor:'#ABABAB', borderBottomWidth:0, fontSize: 16}} placeholderTextColor={'#ABABAB'}
                    // onChangeText={(phone) => this.setState({phone})}
                    value={this.state.card}
                  />
                </Body>
                <Right style={{height:56}}>
                  <Icon active name="arrow-down" style={{color:'#FED657', fontSize:24}}
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: CARD_BUTTONS,
                          cancelButtonIndex: CARD_CANCEL_INDEX,
                          // destructiveButtonIndex: CARD_DESTRUCTIVE_INDEX,
                          // title: "Testing ActionSheet"
                        },
                        cardIndex => {
                          this.setState({ card: CARD_BUTTONS[cardIndex] });
                          this.handleClickCardSelect(CARD_BUTTONS, cardIndex);
                        }
                      )}
                  />
                </Right>
              </ListItem>
            </View>

            {/*Добавление новой карты*/}

            {/*{ this.state.card }*/}


            {/*Кнопка оплаты*/}

            <View style={{marginTop:32}}>
              <Button  full rounded style={{ backgroundColor: '#FED657', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', fontSize:16, color: '#004d99'}}>Пополнить</Text>
              </Button>
            </View>
          </Content>
          <StandardFooter />
        </Container>
      );
    }
}
