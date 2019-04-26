import React from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native';
import Screen from './Screen';
import {
  Button,
  Container,
  ActionSheet,
  Content
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import moment from 'moment';
import {phoneFormat, font, padding} from 'app/utils/helpers';
import {userInfo, fetchMsisdns, selectPhone, fetchBalance} from 'app/src/actions';
import NavigationService from 'app/src/services/NavigationService';

import StandardFooter from 'app/src/elements/Footer';
import ClientMainBalance from 'app/src/elements/ClientMainBalance';
import ClientMainInfo from 'app/src/elements/ClientMainInfo';
import TariffConditions from 'app/src/elements/TariffConditions';
import tariffs from 'app/utils/tariffData.json';

class Main extends Screen{
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
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

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

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

  selectPhone = msisdn => {
    this.props.dispatch(selectPhone(msisdn));
    this.setState({subTitle: phoneFormat(msisdn)});
    this.getBalance(msisdn);
  }

  getBalance = async (phone) => {
    const { auth, dispatch } = this.props;
    dispatch(fetchBalance(phone, auth.accessToken));
  }

  onPressNumbers = () => {
    console.log(this.props);
    if (this.props.user && this.props.user.msisdns && this.props.user.msisdns.length > 1) {
      let phones = this.props.user.msisdns.map(v => phoneFormat(v));

      ActionSheet.show(
        {
          options: phones.concat(['Отмена']),
          cancelButtonIndex: this.props.user.msisdns.length,
          title: 'Посмотреть баланс'
        },
        buttonIndex => {
          if (buttonIndex == this.props.user.msisdns.length) //Отмена
            return false;

          let phone = this.props.user.msisdns[buttonIndex];

          this.selectPhone(phone);
        }
      );
    }
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

  requireImage = (index) => {
    let images = [
      require('app/assets/image/tariffs/travel.png'),
      require('app/assets/image/tariffs/connect.png'),
    ];

    if (index < 0 || index >= images.length) return false;

    return images[index];
  }

  renderPhone() {
    if (!this.props.user || !this.props.user.selectedPhone) return null;

    const { selectedPhone } = this.props.user;
    const chevron = (this.props.user && this.props.user.msisdns && this.props.user.msisdns.length ? (
      <MaterialCommunityIcons
        name='chevron-down'
        size={18}
        color={dP.color.white}
      />
    ) : null );

    return (
      <TouchableOpacity onPress={this.onPressNumbers}
        style={{flex: 1, flexDirection: 'row', marginBottom: 24}}>
        <Text numberOfLines={1} style={{color: dP.color.white, fontSize: 16}}>
          { phoneFormat(selectedPhone) }
        </Text>
        { chevron }
      </TouchableOpacity>
    );
  }

  renderContent() {
    const BUTTONS = ['Банковская карта', 'Отмена'];
    const CANCEL_INDEX = 2;

    const width = Dimensions.get('window').width;
    const { fullName, tariff } = this.props.user;

    const balance = (this.hasBalance(this.props.user) ?
      <ClientMainBalance balance={this.props.user.balance}/>
      : null);

    const mainInfo = (this.hasBalance(this.props.user) && tariff?
      (
        <View>
          <Text style={{fontFamily:'Roboto_light', fontSize:18, color:'#FFFFFF', marginTop: 5, marginBottom: -5}}>
            тариф
          </Text>
          <Text style={{fontFamily:'Roboto_black', fontSize:36, color:'#FFFFFF'}}>
            {tariffs[tariff].title}
          </Text>
          <Text style={{fontFamily:'Roboto_light', fontSize:18, color:'#FFFFFF'}}>
            {tariffs[tariff].tagline}
          </Text>
          <Text style={{fontFamily:'Roboto_light', fontSize:13, color:'#FFFFFF'}}>
            {tariffs[tariff].services}
          </Text>

          <ClientMainInfo balance={this.props.user.balance} tariff={tariffs[tariff]} />

        </View>
      )
      : null);

    const conditions = (tariffs && tariff ? (
      <View>
        <TariffConditions tariff={tariffs[tariff]}/>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontFamily:'Roboto', fontSize:14, color:'#FFFFFF'}}
            onPress={() => NavigationService.navigate('Tariff', {tariff: tariffs.travel})}
          >
            Условия тарифа
          </Text>
          <Text style={{fontFamily:'Roboto', fontSize:14, color:'#FFFFFF', marginLeft: 15}}
            onPress={() => NavigationService.navigate('TariffList')}
          >
            Сменить тариф
          </Text>
        </View>
      </View>
    ) : null);

    const topUpButton = (this.props.user && this.props.user.selectedPhone ? (
      <Button rounded
        style={{
          backgroundColor: dP.color.accent,
          // alignSelf: 'center',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          ...padding(10)
        }}
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
        <Text style={font('Roboto_black', 16, dP.color.primary, null, {textAlign: 'center'})}>
          Пополнить
        </Text>
      </Button>
    ) : null);

    const balanceBlock = (this.props.user.selectedPhone ? (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
        <View style={{width:'55%'}}>
          {balance}
        </View>
        <View style={{width:'45%'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems:'center', marginBottom: 6}}>
            {topUpButton}
          </View>
        </View>
      </View>
    ) : null);

    return (
      <Container style={{backgroundColor: tariff ? tariffs[tariff].color : dP.color.primary}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor='white'
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }

        >

          <Content>

            <View style={{
              ...padding(16, 32),
              backgroundColor: dP.color.primary
            }}>
              <View>
                <Text style={{
                  fontFamily: 'Roboto_black',
                  color: dP.color.white,
                  fontSize:24,
                  paddingBottom: 16,
                }}>{fullName}</Text>
                {this.renderPhone()}
              </View>
              <View>
                {balanceBlock}
              </View>
            </View>


            <View style={{
              ...padding(16, 32),
              width,
              height: '100%',
              position: 'relative'
            }}
            >
              <View style={{ width: '50%', position: 'absolute', right: 0 }}>
                <Image
                  style={{ height: 180, width: '100%' }}
                  resizeMode='cover'
                  source={this.requireImage(Object.keys(tariffs).indexOf(tariff))}
                />
              </View>
              {mainInfo}

              {conditions}
            </View>



          </Content>
        </ScrollView>
        <StandardFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Main);
