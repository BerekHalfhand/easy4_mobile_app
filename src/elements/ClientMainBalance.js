import React from 'react';
import { View } from 'native-base';
import { Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class ClientMainBalance extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const { width } = Dimensions.get('window');
    const guidelineBaseWidth = 420;
    const scale =  width / guidelineBaseWidth;

    return(
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={{fontFamily:'Roboto_light', fontSize:18, color:'#FFFFFF'}}>
          баланс
        </Text>
        <Text style={{fontFamily:'Roboto_black', fontSize:(32*scale), color:'#FFFFFF'}}>
          {this.props.balance} ₽
        </Text>
      </View>

    );
  }
}

ClientMainBalance.propTypes = {
  balance: PropTypes.number,
};

ClientMainBalance.defaultProps = {
  balance: 0,
};
