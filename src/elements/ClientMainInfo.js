import React from 'react';
import { View } from 'native-base';
import { Text, Dimensions } from 'react-native';
import { dP, styles } from 'app/utils/style/styles';
import PropTypes from 'prop-types';
import {font} from 'app/utils/helpers';
import {scaleTextToFit} from 'app/utils/scaling';
import Pie from 'react-native-pie';

export default class ClientMainInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      callsRate: 2.4,
      trafficRate: 1.2,
      smsRate: 18,
    };
  }

  calculateRemaining(balance, rate) {
    if (balance <= 0) return 0;
    if (rate == 0) return '\u221E'; //infinity

    return Math.floor(balance / rate);
  }

  getRemainingData(bytes) {
    if (!bytes) return 0;
    let megabytes = bytes / 1024 / 1024;
    return Math.round(megabytes * 10) / 10;
  }

  calculateUsage(total, remaining) {
    let used = total - remaining;
    let percentageUsed = 100 / (total / used);
    return [percentageUsed, 100 - percentageUsed];
  }

  renderRemainingDefault() {
    const { width } = Dimensions.get('window');
    const {tariff, user} = this.props;
    const minutes = this.calculateRemaining(user.balance, this.state.callsRate).toString();
    const data = this.calculateRemaining(user.balance, this.state.trafficRate).toString();
    const sms = this.calculateRemaining(user.balance, this.state.smsRate).toString();
    const maxLength = Math.max(minutes.length, data.length, sms.length);

    const circleScale = 5.5;
    const circleStyle = {
      width: width/circleScale,
      height: width/circleScale,
      borderRadius: width/(circleScale * 2),
      backgroundColor: tariff.color,
      justifyContent: 'center',
    };

    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', alignContent:'space-between' }}>
          <View style={circleStyle}>
            <Text style={font('Roboto_black', scaleTextToFit(24, 0.2, minutes, maxLength), dP.color.white, -1.5, {textAlign:'center'})}>
              {minutes}
            </Text>
            <Text style={font('Roboto_light', 13, dP.color.white, -.5, {textAlign:'center'})}>
              минут
            </Text>
          </View>
          <View style={{width: width/5, flex: 1, justifyContent: 'center'}}>
            <Text style={{fontFamily:'Roboto_light', letterSpacing:-.5, fontSize:14, textAlign:'center'}}>
              или
            </Text>
          </View>
          <View style={circleStyle}>
            <Text style={font('Roboto_black', scaleTextToFit(24, 0.2, data, maxLength), dP.color.white, -1.5, {textAlign:'center'})}>
              {data}
            </Text>
            <Text style={font('Roboto_light', 13, dP.color.white, -.5, {textAlign:'center'})}>
              Мб
            </Text>
          </View>
          <View style={{width: width/5, flex: 1, justifyContent: 'center'}}>
            <Text style={{fontFamily:'Roboto_light', letterSpacing:-.5, fontSize:14, textAlign:'center'}}>
              или
            </Text>
          </View>
          <View style={circleStyle}>
            <Text style={font('Roboto_black', scaleTextToFit(24, 0.2, sms, maxLength), dP.color.white, -1.5, {textAlign:'center'})}>
              {sms}
            </Text>
            <Text style={font('Roboto_light', 13, dP.color.white, -.5, {textAlign:'center'})}>
              SMS
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderRemainingData() {
    const {user} = this.props;
    const { width } = Dimensions.get('window');
    const gaugeSize = width * 0.18;
    const gaugeInner = width * 0.145;
    const remainingData = this.getRemainingData(user.tariffRemains);
    const totalData = 3072;

    return (
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <View style={{width:'50%', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
          <View style={{position: 'absolute'}}>
            <Pie
              radius={gaugeSize}
              innerRadius={gaugeInner}
              series={this.calculateUsage(totalData, remainingData)}
              colors={[dP.color.white, dP.color.primary]}
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', width: gaugeSize * 2, height: gaugeSize * 2}}>
            <Text style={font('Roboto_black', 30, '#000')}>{remainingData}</Text>
            <Text style={font('Roboto', 20, '#000')}>Мб</Text>
          </View>
        </View>
        <View style={{width:'50%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={font('Roboto_light', 18, '#000')}>из 3 Гб</Text>
        </View>
      </View>
    );
  }

  render(){
    const {tariff} = this.props;

    return(
      <View style={styles.pane}>
        <Text style={font('Roboto_bold', 16, dP.color.primary, null, {marginTop: -4, marginBottom: 5})}>
          {tariff.infoCaption}
        </Text>
        {tariff.dataOnly ? this.renderRemainingData() : this.renderRemainingDefault()}
      </View>

    );
  }
}

ClientMainInfo.propTypes = {
  user: PropTypes.object.isRequired,
  tariff: PropTypes.object,
};
