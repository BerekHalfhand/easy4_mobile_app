import React from 'react';
import { View } from 'native-base';
import { Text, Dimensions } from 'react-native';
import { dP, styles } from 'app/utils/style/styles';
import PropTypes from 'prop-types';
import {font} from 'app/utils/helpers';
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

  calculateRemaning(balance, rate) {
    if (balance == 0) return 0;
    if (rate == 0) return '\u221E'; //infinity

    return Math.floor(balance / rate);
  }

  renderRemainingDefault() {
    const { width } = Dimensions.get('window');
    const {balance, tariff} = this.props;
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
            <Text style={font('Roboto_black', 24, dP.color.white, -1.5, {textAlign:'center'})}>
              {this.calculateRemaning(balance, this.state.callsRate)}
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
            <Text style={font('Roboto_black', 24, dP.color.white, -1.5, {textAlign:'center'})}>
              {this.calculateRemaning(balance, this.state.trafficRate)}
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
            <Text style={font('Roboto_black', 24, dP.color.white, -1.5, {textAlign:'center'})}>
              {this.calculateRemaning(balance, this.state.smsRate)}
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
    const { width } = Dimensions.get('window');
    const gaugeSize = width * 0.18;
    const gaugeInner = width * 0.145;

    return (
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <View style={{width:'50%', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
          <View style={{position: 'absolute'}}>
            <Pie
              radius={gaugeSize}
              innerRadius={gaugeInner}
              series={[10, 90]}
              colors={[dP.color.white, dP.color.primary]}
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', width: gaugeSize * 2, height: gaugeSize * 2}}>
            <Text style={font('Roboto_black', 30, '#000')}>2700</Text>
            <Text style={font('Roboto', 20, '#000')}>Мб</Text>
          </View>
        </View>
        <View style={{width:'50%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={font('Roboto_light', 18, '#000')}>из 3000 Мб</Text>
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
  balance: PropTypes.number.isRequired,
  tariff: PropTypes.object,
};

ClientMainInfo.defaultProps = {
  balance: 0,
};
