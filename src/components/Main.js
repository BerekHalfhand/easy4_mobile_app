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
import { connect } from 'react-redux';
import {userInfo, selectPhone, dismissError, fetchMsisdns, fetchBalance} from 'app/src/actions';

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
        title: 'Тариф Трэвел 1',
        subTitle: 'Easy4 Travel',
        text: 'Тарифный план «Travel 1» («Трэвел 1») линейки Easy4 Travel, предназначен для туристов и деловых людей, часто совершающих международные поездки.',
        description: [
          {key: 'Без абонентской платы'},
          {key: '1 ₽ за Мб*'},
          {key: '2 ₽ за минуту*'},
          {key: 'Единый тариф во всех странах территории обслуживания, включая Россию'},
        ],
      },
      fakeTariff2: {
        title: 'Тариф 999',
        subTitle: 'Easy4 Connect',
        text: 'Тарифный план «999» для мобильного интернета линейки Easy4 Connect, предназначен для использования в роутерах, смартфонах, планшетах и других «умных» устройствах на территории России и за рубежом.',
        description: [
          {key: 'Только интернет'},
          {key: 'Без абонентской платы'},
          {key: 'Пакет 3 Гб за 999 ₽*'},
          {key: 'Более 60 стран обслуживания, включая Россию'},
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
    if (this.props.errors) {
      if (this.props.errors.userInfoError &&
          (!prevProps.errors || this.props.errors.userInfoError != prevProps.errors.userInfoError)) {
        Alert.alert(
          'User Info Error',
          this.props.errors.userInfoError,
          [{text: 'OK', onPress: () => this.onDismissError('userInfoError')}],
          { onDismiss: () => this.onDismissError('userInfoError') }
        );
      }

      if (this.props.errors.fetchMsisdnsError &&
          (!prevProps.errors || this.props.errors.fetchMsisdnsError != prevProps.errors.fetchMsisdnsError)) {
        Alert.alert(
          'MSISDNs Fetching Error',
          this.props.errors.fetchMsisdnsError,
          [{text: 'OK', onPress: () => this.onDismissError('fetchMsisdnsError')}],
          { onDismiss: () => this.onDismissError('fetchMsisdnsError') }
        );
      }

      if (this.props.errors.fetchBalanceError &&
          (!prevProps.errors || this.props.errors.fetchBalanceError != prevProps.errors.fetchBalanceError)) {
        Alert.alert(
          'Balance Fetching Error',
          this.props.errors.fetchBalanceError,
          [{text: 'OK', onPress: () => this.onDismissError('fetchBalanceError')}],
          { onDismiss: () => this.onDismissError('fetchBalanceError') }
        );
      }
    }
  }

  onDismissError = type => {
    this.props.dispatch(dismissError(type));
    if (type == 'userInfoError')
      NavigationService.navigate('Login');
  }

  loadData = () => {
    console.log('token', this.props.accessToken);
    const { accessToken, dispatch } = this.props;
    dispatch(userInfo(accessToken));
    dispatch(fetchMsisdns(accessToken));
  };

  getBalance = async (phone) => {
    console.log('getBalance:', phone);
    const { accessToken, dispatch } = this.props;
    dispatch(fetchBalance(phone, accessToken));
  }

  selectPhone = msisdn => {
    this.props.dispatch(selectPhone(msisdn));
    this.props.navigation.setParams({ phone: msisdn });
    this.getBalance(msisdn);
  }

  onPressIncrease(idx, phone){
    switch (idx) {
    case 0:
      this.props.navigation.navigate('IncreaseBalance', {phone: phone});
      break;


    }

  }

  onPressNumbers() {
    // TODO: choose one automatically
    if (this.props.user && this.props.user.msisdns && this.props.user.msisdns.length)
      ActionSheet.show(
        {
          options: this.props.user.msisdns.concat(['Отмена']),
          cancelButtonIndex: this.props.user.msisdns.length,
          title: 'Основной номер'
        },
        buttonIndex => {
          if (buttonIndex == this.props.user.msisdns.length) //Отмена
            return false;

          let phone = this.props.user.msisdns[buttonIndex];

          this.selectPhone(phone);
        }
      );
  }

  renderMSISDNS() {
    if (this.props.user && this.props.user.msisdns && this.props.user.msisdns.length > 0) {
      if (!this.props.user.selectedPhone) {
        this.selectPhone(this.props.user.msisdns[0]);
      }
      return (
        <Button full transparent rounded
          style={styles.buttonPrimaryInverse}
          onPress={this.onPressNumbers}
        >
          <View >
            <Text style={{fontFamily:'SFCT_Regular', fontSize:13, color:'#FFFFFF', lineHeight:24}}>
              {this.props.user.msisdns.length}
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

    const balance = (this.props.user && this.props.user.balance !== null ?
      <ClientMainBalance balance={this.props.user.balance} />
      : null);
    const mainInfo = (this.props.user && this.props.user.balance !== null ?
      <ClientMainInfo balance={this.props.user.balance} />
      : null);

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
                {balance}
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
                          if (this.props.user)
                            this.onPressIncrease(buttonIndex, this.props.user.selectedPhone);
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
              text={this.state.fakeTariff1.text}
              description={this.state.fakeTariff1.description} />

            <TariffPane
              title={this.state.fakeTariff2.title}
              subTitle={this.state.fakeTariff2.subTitle}
              text={this.state.fakeTariff2.text}
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
