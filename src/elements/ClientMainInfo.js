import React from 'react';
import { View } from 'native-base';
import { Text } from 'react-native';
import { dP, styles } from 'app/utils/style/styles';
import PropTypes from 'prop-types';

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

  render(){
    const {balance} = this.props;

    return(
      <View style={styles.pane}>
        <Text style={{fontFamily:'Roboto_light', fontSize:24, color:dP.color.primary}}>
          Вам доступно
        </Text>
        <View style={{flex: 1, flexDirection: 'row', alignContent:'space-between' }}>
          <View style={{width:'25%'}}>
            <Text style={{fontFamily:'Roboto_black', letterSpacing:-1.5 , fontSize:36, textAlign:'center', color:dP.color.primary}}>
              {this.calculateRemaning(balance, this.state.callsRate)}
            </Text>
          </View>
          <View style={{width:'12%', flex: 1, justifyContent: 'center'}}>
            <Text style={{fontFamily:'Roboto_light', letterSpacing:-.5, fontSize:14, textAlign:'center'}}>
              или
            </Text>
          </View>
          <View style={{width:'25%'}}>
            <Text style={{fontFamily:'Roboto_black', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary}}>
              {this.calculateRemaning(balance, this.state.trafficRate)}
            </Text>
          </View>
          <View style={{width:'12%', flex: 1, justifyContent: 'center'}}>
            <Text style={{fontFamily:'Roboto_light', letterSpacing:-.5, fontSize:14, textAlign:'center'}}>
              или
            </Text>
          </View>
          <View style={{width:'25%'}}>
            <Text style={{fontFamily:'Roboto_black', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary}}>
              {this.calculateRemaning(balance, this.state.smsRate)}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignContent:'space-between' }}>
          <View style={{width:'25%'}}>
            <Text style={{fontFamily:'Roboto_light', letterSpacing:-.5, fontSize:13, textAlign:'center', color:dP.color.primary}}>
              минут
            </Text>
          </View>
          <View style={{width:'50%'}}>
            <Text style={{fontFamily:'Roboto_light', letterSpacing:-.5, fontSize:13, textAlign:'center', color:dP.color.primary}}>
              Мб интернета
            </Text>
          </View>
          <View style={{width:'25%'}}>
            <Text style={{fontFamily:'Roboto_light', letterSpacing:-.5, fontSize:13, textAlign:'center', color:dP.color.primary}}>
              SMS
            </Text>
          </View>
        </View>
      </View>

    );
  }
}

ClientMainInfo.propTypes = {
  balance: PropTypes.number.isRequired,
};

ClientMainInfo.defaultProps = {
  balance: 0,
};
