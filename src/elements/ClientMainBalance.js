import React from 'react';
import { View } from 'native-base';
import { Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'app/utils/scaling';

export default class ClientMainBalance extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={{fontFamily:'Roboto_light', fontSize:18, color:'#FFFFFF'}}>
          баланс
        </Text>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{fontFamily:'Roboto_black', fontSize: scale(26), color:'#FFFFFF'}}
        >
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
