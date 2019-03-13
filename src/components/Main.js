import React from 'react';
import {TextInput, Image, View, Text} from 'react-native';
import Screen from './Screen';
import {Button, Container, Footer, FooterTab,
  Root,
  Icon,
  ActionSheet,
  Content, Body, Header, Title, ListItem, List, Left, Right, Switch, Form, Picker} from 'native-base';
import {styles, dP} from '../../utils/style/styles';
import StandardFooter from '../elements/Footer';
import ClientMainBalance from '../elements/ClientMainBalance';
import ClientMainInfo from '../elements/ClientMainInfo';
import LogoTitle from '../elements/LogoTitle';
import autoBind from 'react-autobind';

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
    autoBind(this);
    this.state = {
      clicked:'',
      phone: props.phone || null,
      balance: props.balance || 0,
      fake: {
        name: 'Константин Константинович',
        phone: '+7(123)456 78 98',
        numbers: {
          '+7(123)456 78 98': 10200.03,
          '+7(234)456 78 99': 366,
          '+7(345)456 78 00': 123,
        },
        props: props
      }
    };
    this.props.navigation.setParams({ title: this.state.fake.phone, name: this.state.fake.name });

  }

    static navigationOptions = ({ navigation }) => {
      const { state: { params = {} } } = navigation;
      return {
        headerBackTitle: null,
        headerTitle: navigation  =>  <LogoTitle title={params.title || ''} subTitle={params.name || ''} />,
        headerStyle: styles.baseHeader,
        headerTintColor: '#fff',
      };
    }

    handleClickIncrease(idx, phone){
      console.log('траница:', idx);
      switch (idx) {
      case 0:
        this.props.navigation.navigate('IncreaseBalance', {phone: phone});
        break;


      }

    }

    onPressNumbers() {
      ActionSheet.show(
        {
          options: Object.keys(this.state.fake.numbers).concat(['Отмена']),
          cancelButtonIndex: this.state.fake.numbers.length,
          title: 'Основной номер'
        },
        buttonIndex => {
          let phone = Object.keys(this.state.fake.numbers)[buttonIndex];
          this.setState({
            phone: phone,
            balance: this.state.fake.numbers[phone],
          });
          this.props.navigation.setParams({ title: phone });
        }
      );
    }


    render() {
      const BUTTONS = ['Банковская карта', 'Онлайн банк', 'Отмена'];
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
                  <ClientMainBalance balance={this.state.balance} />
                </View>
                <View style={{width:'40%', alignItems:'flex-end'}}>
                  <View style={{flex: 1, justifyContent: 'flex-end', alignContent:'center'}}>
                    <Button  rounded
                      style={styles.buttonPrimaryCash}
                      onPress={() =>
                        ActionSheet.show(
                          {
                            options: BUTTONS,
                            cancelButtonIndex: CANCEL_INDEX,
                            // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            // title: "Testing ActionSheet"
                          },
                          buttonIndex => {
                            this.setState({ clicked: BUTTONS[buttonIndex] });
                            this.handleClickIncrease(buttonIndex, this.state.phone);
                          }
                        )}
                    >
                      <Text style={{fontFamily:'SFCT_Semibold', fontSize:16, letterSpacing: 0.25, color:'rgb(0, 94, 186)'}}>
                Пополнить
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>

              {/* Count Client MSISDN */}
              <View style={{marginBottom:50}}>
                <View style={{flex: 1, flexDirection: 'row', marginTop:40, height:24}}>
                  <Button full transparent rounded
                    style={styles.buttonPrimaryInverse}
                    onPress={this.onPressNumbers}
                  >
                    <View >
                      <Text style={{fontFamily:'SFCT_Regular', fontSize:13, color:'#FFFFFF', lineHeight:24}}>
                        {Object.keys(this.state.fake.numbers).length}
                      </Text>
                    </View>
                    <View>
                      <Text onPress={this.onPressNumbers} style={{fontFamily:'SFCT_Regular', marginLeft:5, fontSize:13, color:'#FFFFFF', lineHeight:24}}>
                  номеров на аккауне
                      </Text>
                    </View>
                    <View>
                      <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24, lineHeight:24, marginLeft:8}}/>
                    </View>

                  </Button>
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
                    <Button style={{ backgroundColor: '#FF9501' }}>
                      <Icon active name="airplane" />
                    </Button>
                  </Left>
                  <Body style={{height:56}}>
                    <Text style={{fontFamily:'SFCT_Regular', color:'#FFFFFF', fontSize:16, lineHeight:56, height:56}}>Тариф</Text>
                  </Body>
                  <Right style={{height:56}}>
                    <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24}} />
                  </Right>
                </ListItem>

                <ListItem icon style={{height:56}}>
                  <Left>
                    <Button style={{ backgroundColor: '#FF9501' }}>
                      <Icon active name="airplane" />
                    </Button>
                  </Left>
                  <Body style={{height:56}}>
                    <Text style={{fontFamily:'SFCT_Regular', color:'#FFFFFF', fontSize:16, lineHeight:56, height:56}}>Квоты</Text>
                  </Body>
                  <Right style={{height:56}}>
                    <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24}}/>
                    {/* <Switch value={false} /> */}
                  </Right>
                </ListItem>

                <ListItem icon style={{height:56}}
                  onPress={() => this.props.navigation.navigate('Costs')}
                >
                  <Left style={{height:56}}>
                    <Button style={{ backgroundColor: '#FF9501' }}>
                      <Icon active name="airplane" />
                    </Button>
                  </Left>
                  <Body style={{height:56}}>
                    <Text style={{fontFamily:'SFCT_Regular', color:'#FFFFFF', fontSize:16, lineHeight:56, height:56}}>Расходы</Text>
                  </Body>
                  <Right style={{height:56}}>
                    <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24, lineHeight:24, }} />
                    {/* <Switch value={false} /> */}
                  </Right>
                </ListItem>
              </View>


              {/* *** */}
            </Content>
            <StandardFooter />
          </Container>
        </Root>


      );
    }
}
