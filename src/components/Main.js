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
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import {phoneFormat} from 'app/utils/helpers';
import {userInfo, fetchMsisdns} from 'app/src/actions';
import NavigationService from 'app/src/services/NavigationService';

import StandardFooter from 'app/src/elements/Footer';
import ClientMainBalance from 'app/src/elements/ClientMainBalance';
import ClientMainInfo from 'app/src/elements/ClientMainInfo';
import LogoTitle from 'app/src/elements/LogoTitle';
import {travel} from 'app/src/elements/TariffPane';

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

  render() {
    const BUTTONS = ['Банковская карта', 'Отмена'];
    const CANCEL_INDEX = 2;

    const width = Dimensions.get('window').width;

    const balance = (this.hasBalance(this.props.user) ?
      <ClientMainBalance balance={this.props.user.balance}/>
      : null);

    const mainInfo = (this.hasBalance(this.props.user) ?
      (
        <View>
          <Text style={{fontFamily:'Roboto_light', fontSize:18, color:'#FFFFFF', marginTop: 5, marginBottom: -5}}>
            тариф
          </Text>
          <Text style={{fontFamily:'Roboto_black', fontSize:36, color:'#FFFFFF'}}>
            Travel
          </Text>
          <Text style={{fontFamily:'Roboto_light', fontSize:13, color:'#FFFFFF'}}>
            пакеты минут не включены
          </Text>

          <ClientMainInfo balance={this.props.user.balance} />

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{fontFamily:'Roboto', fontSize:14, color:'#FFFFFF', marginLeft: 15}}
              onPress={() => NavigationService.navigate('Tariff', {tariff: travel})}
            >
              условия тарифа
            </Text>
            <Text style={{fontFamily:'Roboto', fontSize:14, color:'#FFFFFF', marginLeft: 15}}
              onPress={() => NavigationService.navigate('TariffList')}
            >
              сменить тариф
            </Text>
          </View>
        </View>
      )
      : null);

    const topUpButton = (this.props.user && this.props.user.selectedPhone ? (
      <Button rounded
        style={{...styles.buttonPrimary, width: '100%', justifyContent: 'center', alignItems: 'center'}}
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
        <Text style={{ fontFamily: 'Roboto_black', color: dP.color.primary, fontSize:16, textAlign: 'center'}}>
          Пополнить
        </Text>
      </Button>
    ) : null);

    const balanceBlock = (this.props.user.selectedPhone ? (
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 20, alignItems: 'flex-end'}}>
        <View style={{width:'55%'}}>
          {balance}
        </View>
        <View style={{width:'45%'}}>
          <View style={{flex: 1, justifyContent: 'flex-end', alignContent:'center', marginBottom: 10}}>
            {topUpButton}
          </View>
        </View>
      </View>
    ) : null);


    return (
      <Container style={styles.container}>
        <View style={{
          width,
          height: 180,
          position:'absolute',
          top: 110,
          backgroundColor: dP.color.tariffs.travel,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
        >
          <View style={{ width: '50%' }}>
            <Image
              style={{ height: 180, width: '100%' }}
              resizeMode='cover'
              source={require('app/assets/image/tariffs/travel.png')}
            />
          </View>
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

            {mainInfo}

          </Content>
        </ScrollView>
        <StandardFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Main);
