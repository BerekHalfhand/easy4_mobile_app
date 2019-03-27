import React from 'react';
import { View } from 'native-base';
import { Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';


export default class ClientMainBalance extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const { width, height } = Dimensions.get('window');
    const guidelineBaseWidth = 420;
    const scale =  width / guidelineBaseWidth;

    return(
      <View>
        <View style={{flex: 1, flexDirection: 'row', fontSize:16}}>
          <View >
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, fontSize:16, color:'#FFFFFF'}}>
              Баланс на
            </Text>
          </View>
          <View>
            <Text style={{fontFamily:'SFCT_Regular', letterSpacing:-0.25, marginLeft:5, fontSize:16, color:'#FFFFFF'}}>{ this.props.balanceFetched }</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems:'flex-end'}}>
          <View style={{}}>
            <Text style={{fontFamily:'SFCT_Light', fontSize:(46*scale), marginRight:10, marginTop:10, color:'#FFFFFF', letterSpacing:-2.5}}>
              {this.props.balance}
            </Text>
          </View>
          <View>
            <Text style={{fontSize:24, color:'#FFFFFF'}}>₽</Text>
          </View>
        </View>
      </View>

    );
  }
}

ClientMainBalance.propTypes = {
  balance: PropTypes.number,
  balanceFetched: PropTypes.string,
};

ClientMainBalance.defaultProps = {
  balance: 0,
  balanceFetched: 'сегодня',
};
