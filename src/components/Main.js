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
import moment from 'moment';
import {declOfNumRus, phoneFormat} from 'app/utils/helpers';
import {userInfo, selectPhone, fetchMsisdns, fetchBalance} from 'app/src/actions';

class Main extends Screen{
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      phone: '',
      phones: new Set(),
      user: props.user,
      balance: null,
      balanceFetched: moment().format("D MMMM"),
      fakeTariff1: {
        title: 'Тариф Трэвел 1',
        subTitle: 'Easy4 Travel',
        text: 'Тарифный план «Travel 1» («Трэвел 1») линейки Easy4 Travel, предназначен \
для туристов и деловых людей, часто совершающих международные поездки.',
        description: [
          {key: 'Без абонентской платы'},
          {key: '1 ₽ за Мб*'},
          {key: '2 ₽ за минуту*'},
          {key: 'Единый тариф во всех странах территории обслуживания, включая Россию'},
        ],
      },
      fakeTariff2: {
        title: 'Коннект 999',
        subTitle: 'Easy4 Connect',
        text: 'Тарифный план «999» для мобильного интернета линейки Easy4 Connect, предназначен \
для использования в роутерах, смартфонах, планшетах и других «умных» устройствах на территории России и за рубежом.',
        description: [
          {key: 'Только интернет'},
          {key: 'Без абонентской платы'},
          {key: 'Пакет 3 Гб за 999 ₽*'},
          {key: 'Более 60 стран обслуживания, включая Россию'},
        ],
      },

    };

    if (props.user) {
      props.navigation.setParams({
        name: props.user.fullName,
        phone: props.user.selectedPhone
      });
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      ...Screen.navigationOptions,
      headerLeft: null,
      headerTitle: <LogoTitle title={params.name || 'Главная'} subTitle={phoneFormat(params.phone) || ''}/>,
    };
  }

  componentDidUpdate(prevProps){
    if (this.props.user) {
      // Update header data if it's available and have chaged
      if (this.props.user.fullName &&
          (!prevProps.user ||
            (this.props.user.fullName != prevProps.user.fullName ||
             this.props.user.selectedPhone != prevProps.user.selectedPhone))) {
        this.props.navigation.setParams({
          name: this.props.user.fullName,
          ...(this.props.user.selectedPhone && {phone: this.props.user.selectedPhone})
        });
      }
    }
  }

  getBalance = async (phone) => {
    // console.log('getBalance:', phone);
    const { accessToken, dispatch } = this.props;
    dispatch(fetchBalance(phone, accessToken));

    // 26 марта, 5 апреля
    this.setState({
      balanceFetched: moment().format("D MMMM"),
    });
  }

  selectPhone = msisdn => {
    this.props.dispatch(selectPhone(msisdn));
    this.props.navigation.setParams({ phone: msisdn });
    this.getBalance(msisdn);
  }

  hasBalance = (user) => {
    return user &&
      user.balance !== null &&
      typeof user.balance !== 'undefined';
  }

  onPressIncrease(idx){
    let { selectedPhone } = this.props.user;
    if (selectedPhone){
      switch (idx) {
      case 0:
        this.props.navigation.navigate('IncreaseBalance', {phone: phoneFormat(selectedPhone)});
        break;

      }
    }
  }

  onPressNumbers() {
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

  render() {
    const BUTTONS = ['Банковская карта', 'Отмена'];
    const CANCEL_INDEX = 2;

    const balance = (this.hasBalance(this.props.user) ?
      <ClientMainBalance balance={this.props.user.balance} balanceFetched={this.state.balanceFetched}/>
      : null);

    const mainInfo = (this.hasBalance(this.props.user) ?
      <ClientMainInfo balance={this.props.user.balance} />
      : null);

    const topUpButton = (this.props.user && this.props.user.selectedPhone ? (
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
                this.onPressIncrease(buttonIndex);
            }
          )}
      >
        <Text style={{fontFamily:'SFCT_Semibold', fontSize:12, letterSpacing: 0.25, color:'rgb(0, 94, 186)'}}>
          Пополнить
        </Text>
      </Button>
    ) : null);

    const balanceBlock = (this.props.user.selectedPhone ? (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width:'60%'}}>
          {balance}
        </View>
        <View style={{width:'40%', alignItems:'flex-end'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', alignContent:'center'}}>
            {topUpButton}
          </View>
        </View>
      </View>
    ) : null);

    const msisdns = (this.props.user && this.props.user.msisdns && this.props.user.msisdns.length > 0 ? (
      <View style={{marginBottom:50}}>
        <View style={{flex: 1, flexDirection: 'row', marginTop:40, height:24}}>
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
              <Text onPress={this.onPressNumbers}
                style={{fontFamily:'SFCT_Regular', marginLeft:5, fontSize:13, color:'#FFFFFF', lineHeight:24}}>
                {declOfNumRus(this.props.user.msisdns.length, ['номер', 'номера', 'номеров'])} на аккауне
              </Text>
            </View>
            <View>
              <Icon active name="arrow-forward" style={{color:'#FED657', fontSize:24, lineHeight:24, marginLeft:8}}/>
            </View>

          </Button>
        </View>
      </View>
    ) : null );


    return(
      <Root>
        <Container style={{backgroundColor:'#004d99'}}>

          <Image
            style={{width: '100%', zIndex:-3, position:'absolute'}}
            source={require('../../assets/image/bitmap.png')}
          />
          <Content style={{ width: '100%', padding:24}}>

            {balanceBlock}

            {msisdns}

            {mainInfo}

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

          </Content>
          <StandardFooter />
        </Container>
      </Root>


    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Main);
