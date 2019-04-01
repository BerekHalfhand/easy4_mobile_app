import React from 'react';
import {Image, View, Text, ScrollView, RefreshControl, Dimensions} from 'react-native';
import Screen from './Screen';
import {
  Button,
  Container,
  Icon,
  ActionSheet,
  Content
} from 'native-base';
import {styles} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import moment from 'moment';
import {declOfNumRus, phoneFormat} from 'app/utils/helpers';
import {userInfo, selectPhone, fetchMsisdns, fetchBalance} from 'app/src/actions';


import StandardFooter from 'app/src/elements/Footer';
import ClientMainBalance from 'app/src/elements/ClientMainBalance';
import ClientMainInfo from 'app/src/elements/ClientMainInfo';
import LogoTitle from 'app/src/elements/LogoTitle';
import TariffPane from 'app/src/elements/TariffPane';

class Main extends Screen{
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      balanceFetched: moment().format('D MMMM'),
      refreshing: false,
    };

    if (props.user) {
      props.navigation.setParams({
        name: props.user.fullName,
        phone: props.user.selectedPhone
      });
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.loadData();
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

      // The data has been refreshed
      if (this.state.refreshing && prevProps.api.isLoadingData && !this.props.api.isLoadingData)
        this.setState({refreshing: false});
    }
  }

  loadData = () => {
    const { auth, dispatch } = this.props;

    dispatch(userInfo(auth.accessToken));
    dispatch(fetchMsisdns(auth.accessToken));
  };


  getBalance = async (phone) => {
    // console.log('getBalance:', phone);
    const { accessToken, dispatch } = this.props;
    dispatch(fetchBalance(phone, accessToken));

    // 26 марта, 5 апреля
    this.setState({
      balanceFetched: moment().format('D MMMM'),
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

    const width = Dimensions.get('window').width;

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
        <Text style={{...styles.textButtonPrimary, fontSize:12}}>
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
              <Text style={styles.textLabel}>
                {this.props.user.msisdns.length}
              </Text>
            </View>
            <View>
              <Text onPress={this.onPressNumbers}
                style={styles.textLabel}>
                {' ' + declOfNumRus(this.props.user.msisdns.length, ['номер', 'номера', 'номеров'])} на аккауне
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
      <Container style={styles.container}>
        <View>
          <Image
            style={{width, position:'absolute', top: 10}}
            source={require('app/assets/image/balls.png')}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor='white'
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }

        >

          <Content padder style={styles.content}>

            {balanceBlock}

            {msisdns}

            {mainInfo}

            <TariffPane tariff='travel' />

            <TariffPane tariff='connect' />

          </Content>
        </ScrollView>
        <StandardFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Main);
