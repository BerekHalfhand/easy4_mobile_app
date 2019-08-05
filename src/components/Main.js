import React from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Screen from './Screen';
import {
  Button,
  Container,
  Content
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import moment from 'moment';
import {phoneFormat, font, padding, checkNested} from 'app/utils/helpers';
import {readState, userInfo, fetchMsisdns, selectPhone, fetchBalance} from 'app/src/actions';
import Modal from 'react-native-modal';
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
      isModalVisible: false,
    };

    if (props.user) {
      props.navigation.setParams({
        name: props.user.fullName,
        phone: props.user.selectedPhone
      });
      if (!props.user.msisdns || !props.user.msisdns.length)
        NavigationService.navigate('Newbie'); // if the user has no SIMs, redirect them
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

    dispatch(userInfo());
    dispatch(fetchMsisdns());
  };

  selectPhone = msisdn => {
    this.toggleModal();
    const { dispatch, navigation } = this.props;

    setTimeout(() => { // let the animation play out smoothly before all the heavy lifting
      dispatch(selectPhone(msisdn));
      navigation.setParams({ phone: msisdn });
    }, 250);
  }

  navigateToBindIccid = () => {
    this.toggleModal();
    setTimeout(() => { // let the animation play out smoothly before all the heavy lifting
      NavigationService.navigate('BindIccid');
    }, 250);
  }

  getBalance = async (phone) => {
    const { auth, dispatch } = this.props;
    dispatch(fetchBalance(phone));
  }

  getTariff() {
    const {user} = this.props;
    if (!user) return false;

    if (user.tariffId) {
      if (user.tariffId == tariffs.connect.id) return 'connect';
      if (user.tariffId == tariffs.travel.id) return 'travel';
      if (user.tariffId == tariffs.vip.id) return 'vip';
    }
    return null;
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onPressNumbers() {
    const {user, dispatch} = this.props;
    dispatch(readState());

    if (user && user.msisdns && user.msisdns.length)
      this.setState({isModalVisible: true});
  }


  hasBalance = (user) => {
    return user &&
      user.balance !== null &&
      typeof user.balance !== 'undefined';
  }

  onPressIncrease(){
    let { selectedPhone } = this.props.user;
    if (selectedPhone){
      this.props.navigation.navigate('IncreaseBalance', {phone: phoneFormat(selectedPhone)});
    }
  }

  requireImage = (index) => {
    let images = [
      require('app/assets/image/tariffs/travel.png'),
      require('app/assets/image/tariffs/connect.png'),
      require('app/assets/image/tariffs/travel.png'),
    ];

    if (index < 0 || index >= images.length) return false;

    return images[index];
  }

  renderPhone() {
    if (!checkNested(this.props, 'user', 'selectedPhone')) return null;

    const { selectedPhone } = this.props.user;

    return (
      <TouchableOpacity onPress={this.onPressNumbers}
        style={{flex: 1, flexDirection: 'row', marginBottom: 24}}>
        <Text numberOfLines={1} style={{color: dP.color.white, fontSize: 16}}>
          { phoneFormat(selectedPhone) }
        </Text>
        <MaterialCommunityIcons
          name='chevron-down'
          size={18}
          color={dP.color.white}
        />
      </TouchableOpacity>
    );
  }

  renderContent() {
    const {user} = this.props;
    if (!user) return false;

    const width = Dimensions.get('window').width;
    const { fullName } = user;
    const tariff = this.getTariff();

    const balance = (this.hasBalance(user) ?
      <ClientMainBalance balance={user.balance}/>
      : null);

    const mainInfo = (this.hasBalance(user) && tariff?
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

          <ClientMainInfo user={user} tariff={tariffs[tariff]} />

        </View>
      )
      : null);

    const conditions = (tariffs && tariff ? (
      <View>
        <TariffConditions tariff={tariffs[tariff]}/>
      </View>
    ) : null);

    const topUpButton = (user.selectedPhone ? (
      <Button rounded
        style={{
          backgroundColor: dP.color.accent,
          // alignSelf: 'center',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          ...padding(10)
        }}
        onPress={() => this.onPressIncrease()}
      >
        <Text style={font('Roboto_black', 16, dP.color.primary, null, {textAlign: 'center'})}>
          Пополнить
        </Text>
      </Button>
    ) : null);

    const balanceBlock = (user.selectedPhone ? (
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

    const modal = (user.msisdns && user.msisdns.length ? (
      <Modal
        isVisible={this.state.isModalVisible}
        onBackButtonPress={this.toggleModal}
        onBackdropPress={this.toggleModal}
        propagateSwipe
        style={{flex: 1, justifyContent: 'flex-end'}}
      >
        <View style={styles.modal}>
          <ScrollView>
            <Text style={font('Roboto', 20, '#000', null, {marginBottom: 8})}>Основной номер</Text>
            {user.msisdns.map(v => (
              <TouchableOpacity key={v} style={styles.modalItemContainer} onPress={() => this.selectPhone(v)}>
                <View style={styles.modalItem}>
                  <MaterialCommunityIcons
                    name={v == user.selectedPhone ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
                    color='#000'
                    size={20} />
                </View>
                <Text style={
                  font(
                    (v == user.selectedPhone ? 'Roboto_bold' : 'Roboto'),
                    16,
                    (v == user.selectedPhone ? '#6a6a6a' : '#5a5a5a')
                  )}>
                  {phoneFormat(v)}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalItemContainer} onPress={() => this.navigateToBindIccid()}>
              <View style={styles.modalItem}>
                <MaterialCommunityIcons
                  name='plus'
                  color='#000'
                  size={20} />
              </View>
              <Text style={
                font('Roboto', 16, '#5a5a5a')
              }>
                Добавить
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginBottom: -12}}>
              <Button transparent
                onPress={this.toggleModal}
              >
                <Text style={font('Roboto_black', 16, dP.color.primary)}>
                  ОТМЕНА
                </Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    ) : null);

    let requireImg = this.requireImage(Object.keys(tariffs).indexOf(tariff));
    let imgUrl = requireImg ? requireImg : require('app/assets/image/empty.png');
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
                  source={imgUrl}
                />
              </View>
              {modal}

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
