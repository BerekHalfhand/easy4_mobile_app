import React from 'react';
import {Alert, Image, View, Text} from 'react-native';
import Screen from './Screen';
import {
  Button,
  Container,
  Root,
  Icon,
  ActionSheet,
  Content
} from 'native-base';
import {styles} from 'app/utils/style/styles';
import StandardFooter from 'app/src/elements/Footer';
import ClientMainBalance from 'app/src/elements/ClientMainBalance';
import ClientMainInfo from 'app/src/elements/ClientMainInfo';
import LogoTitle from 'app/src/elements/LogoTitle';
import TariffPane from 'app/src/elements/TariffPane';
import NavigationService from 'app/src/services/NavigationService';
import autoBind from 'react-autobind';
import Api from 'app/utils/api';
import { connect } from 'react-redux';
import {userInfo, selectPhone, dismissError} from 'app/src/actions';

class Main extends Screen{
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      phone: '',
      phones: new Set(),
      user: props.user,
      balance: null,
      fakeTariff1: {
        title: 'Easy4 Travel',
        subTitle: 'Тариф Трэвел',
        description: [
          {key: 'Без абонентской платы'},
          {key: '1 Р за Мб*'},
          {key: '2 Р за минуту*'},
          {key: 'Единый тариф во всех странах территории обслуживания'},
        ],
      },
      fakeTariff2: {
        title: 'Connect Internet',
        subTitle: 'Тариф Коннект Интернет',
        description: [
          {key: 'Без абонентской платы'},
          {key: 'Пакет 3 Гб за 999Р*'},
          {key: 'Более 60 стран обслуживания'},
        ],
      },

    };

    if (props.user)
      props.navigation.setParams({
        name: props.user.fullName,
        phone: props.user.selectedPhone
      });
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      ...Screen.navigationOptions,
      headerLeft: null,
      headerTitle: <LogoTitle title={params.name || ''} subTitle={params.phone || ''}/>,
    };
  }

  componentWillMount() {
    this.loadData();

    if (this.props.user && this.props.user.selectedPhone)
      this.getBalance(this.props.user.selectedPhone);
  }

  componentDidUpdate(prevProps){
    // Update header data if it's available and have chaged
    if (this.props.user &&
        (!prevProps.user ||
          (this.props.user.fullName != prevProps.user.fullName ||
           this.props.user.selectedPhone != prevProps.user.selectedPhone))) {
      this.props.navigation.setParams({
        name: this.props.user.firstName + ' ' + this.props.user.lastName,
        ...(this.props.user.selectedPhone && {phone: this.props.user.selectedPhone})
      });
    }

    // If there is a new error, show it
    if (this.props.errors && this.props.errors.userInfoError &&
        (!prevProps.errors || this.props.errors.userInfoError != prevProps.errors.userInfoError)) {
      Alert.alert(
        'User Info Error',
        this.props.errors.userInfoError,
        [{text: 'OK', onPress: this.onDismissError}]);
    }
  }

  onDismissError = () => {
    this.props.dispatch(dismissError('userInfoError'));
    NavigationService.navigate('Login');
  }

  loadData = () => {
    console.log('token', this.props.accessToken);
    this.props.dispatch(userInfo(this.props.accessToken));

    //TODO if there is a phone number, first make an active

    let userPhones = Api.msisdns(this.props.accessToken)
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
    Api.balance(phone, this.props.accessToken)
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
        this.props.dispatch(selectPhone(phone));
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
    const CANCEL_INDEX = 2;

    const balance = <ClientMainBalance balance={this.state.balance} />;
    const mainInfo = (this.state.balance ? <ClientMainInfo balance={this.state.balance} /> : null);

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
                {this.state.balance !== null ? balance : null}
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

            {mainInfo}

            {/* *** */}

            <TariffPane
              title={this.state.fakeTariff1.title}
              subTitle={this.state.fakeTariff1.subTitle}
              description={this.state.fakeTariff1.description} />

            <TariffPane
              title={this.state.fakeTariff2.title}
              subTitle={this.state.fakeTariff2.subTitle}
              description={this.state.fakeTariff2.description} />

            {/*
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
                </Right>
              </ListItem>
            </View>
            */}

          </Content>
          <StandardFooter />
        </Container>
      </Root>


    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Main);
