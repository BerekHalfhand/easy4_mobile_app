import React from 'react';
import {Alert, AsyncStorage, TextInput, Image, View, Text} from 'react-native';
import Screen from './Screen';
import {Button, Container, Footer, FooterTab,
  Root,
  Icon,
  ActionSheet,
  Content, Body, Header, Title, ListItem, List, Left, Right, Switch, Form, Picker} from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import StandardFooter from 'app/src/elements/Footer';
import ClientMainBalance from 'app/src/elements/ClientMainBalance';
import ClientMainInfo from 'app/src/elements/ClientMainInfo';
import LogoTitle from 'app/src/elements/LogoTitle';
import autoBind from 'react-autobind';
import Api from 'app/utils/api';

export default class Main extends Screen{
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      phone: '',
      phones: new Set(),
      firstName: '',
      lastName: '',
      clicked:'',
      balance: 0,
    };

  }

  componentWillMount() {
    this.loadData();
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      ...Screen.navigationOptions,
      headerTitle: <LogoTitle title={params.phone || ''} subTitle={params.name || ''} />,
    };
  }

  loadData = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    this.setState({token: token});
    console.log('token', token);

    let userData = Api.userInfo(token)
      .then(data => {
        console.log('userData:', data);

        if (!data._id)
          throw data.msg;

        this.props.navigation.setParams({
          phone: data.phone,
          name: data.firstName + ' ' + data.lastName,
        });

        this.setState({
          phone: data.phone,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      })
      .catch(e => Alert.alert('Data Fetching Error', e.toString()));

    let userPhones = Api.msisdns(token)
      .then(data => {
        console.log('userPhones:', data);

        if (!data.items)
          throw data.msg;

        this.setState({
          phones: new Set(data.items.map(a => a.msisdn))
        });
      })
      .catch(e => Alert.alert('MSISDNS Fetching Error', e.toString()));
  };

  getBalance = async (phone) => {
    console.log('getBalance:', phone);
    Api.balance(phone, this.state.token)
      // .then(response => console.log(response))
      .then(data => {
        console.log('getBalance:', data);

        if (typeof data.balance !== 'number')
          throw data.msg;

        this.setState({
          balance: data.balance,
        });
        console.log('setting balance to:', this.state.balance);
      })
      .catch(e => Alert.alert('Balance Fetching Error', e.toString()));
  }

  onPressIncrease(idx, phone){
    switch (idx) {
    case 0:
      this.props.navigation.navigate('IncreaseBalance', {phone: phone});
      break;


    }

  }

  onPressNumbers() {
    let phones = Array.from(this.state.phones);
    ActionSheet.show(
      {
        options: phones.concat(['Отмена']),
        cancelButtonIndex: phones.length,
        title: 'Основной номер'
      },
      buttonIndex => {
        if (buttonIndex == phones.length) //Отмена
          return false;

        let phone = phones[buttonIndex];
        this.getBalance(phone);

        this.setState({
          phone: phone,
          // balance: phones[phone],
        });
        this.props.navigation.setParams({ phone: phone });
      }
    );
  }

  renderMSISDNS() {
    if (this.state.phones.size > 0) {
      return (
        <Button full transparent rounded
          style={styles.buttonPrimaryInverse}
          onPress={this.onPressNumbers}
        >
          <View >
            <Text style={{fontFamily:'SFCT_Regular', fontSize:13, color:'#FFFFFF', lineHeight:24}}>
              {this.state.phones.size}
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
      );
    }
  }

  render() {
    const BUTTONS = ['Банковская карта', 'Онлайн банк', 'Отмена'];
    const DESTRUCTIVE_INDEX = 3;
    const CANCEL_INDEX = 2;
    // console.log('state:', this.state);
    // console.log('navigation:', this.props);
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
                {this.renderMSISDNS()}
              </View>
            </View>


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
