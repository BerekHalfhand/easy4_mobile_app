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
        <View style={{flex: 1, flexDirection: 'row', alignContent:'space-between',
          shadowColor:'#000000',
          shadowRadius:5,
          shadowOffset:{width:10,height:16}
        }}>
          <View style={{width:'33%'}}>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.15, fontSize:14, textAlign:'center'}}>
              Звонки
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary, paddingTop:8, paddingBottom:8}}>
              {this.calculateRemaning(balance, this.state.callsRate)}
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', fontSize:13, textAlign:'center', color: 'rgba(0,0,0,0.4)'}}>
              мин
            </Text>
          </View>
          <View style={{width:'33%',borderLeftWidth:1, borderRightWidth:1, borderLeftColor:'#F2F2F2', borderRightColor:'#F2F2F2'}}>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.15, fontSize:14, textAlign:'center'}}>
              Интернет
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary, paddingTop:8, paddingBottom:8}}>
              {this.calculateRemaning(balance, this.state.trafficRate)}
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', fontSize:13, textAlign:'center', color: 'rgba(0,0,0,0.4)'}}>
              мб
            </Text>
          </View>
          <View style={{width:'33%'}}>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.15, fontSize:14, textAlign:'center'}}>
              SMS
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-1.5, fontSize:34, textAlign:'center', color:dP.color.primary, paddingTop:8, paddingBottom:8}}>
              {this.calculateRemaning(balance, this.state.smsRate)}
            </Text>
            <Text style={{fontFamily:'SFCT_Regular', fontSize:13, textAlign:'center', color: 'rgba(0,0,0,0.4)'}}>
              шт
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
