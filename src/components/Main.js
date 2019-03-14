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
import NavBack from '../elements/NavBack';
import autoBind from 'react-autobind';

export default class Main extends Screen{
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      clicked:'',
      phone: props.navigation.state.params.phone || null,
      name: props.navigation.state.params.name || null,
      balance: props.balance || 0,
      fake: {
        numbers: {
          '+7(123)456 78 98': 10200.03,
          '+7(234)456 78 99': 366,
          '+7(345)456 78 00': 123,
        },
        props: props
      }
    };

    this.props.navigation.setParams({
      title: this.state.phone || this.state.fake.phone,
      name: this.state.name || this.state.fake.name
    });

  }

  componentWillMount() {
    this.loadData();
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      headerBackImage: <NavBack />,
      headerBackTitle: null,
      headerTitle: navigation  =>  <LogoTitle title={params.phone || ''} subTitle={params.name || ''} />,
      headerStyle: styles.baseHeader,
      headerTintColor: '#fff',
    };
  }

  loadData = async () => {
    console.log('loadData');
    fetch('https://mp.api.easy4.pro/user/info', { 
      headers: {
        Accept: 'application/json',
      },
    })
      // .then(response => response.json())
      .then(response => console.log(response))
  }

  onPressIncrease(idx, phone){
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
        this.props.navigation.setParams({ phone: phone });
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
          <Content style={{ width: '100%', padding:24}}>

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
                          this.onPressIncrease(buttonIndex, this.state.phone);
                        }
                      )}
                  >
                    <Text style={{fontFamily:'SFCT_Semibold', fontSize:12, letterSpacing: 0.25, color:'rgb(0, 94, 186)'}}>
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
            <View style={{marginLeft:-14, marginBottom: 30}}>
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
