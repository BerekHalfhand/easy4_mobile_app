import React from 'react';
import { View } from 'native-base';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import {scaleTextToFit} from 'app/utils/scaling';
import {font} from 'app/utils/helpers';

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
          style={font('Roboto_black', scaleTextToFit(26, 0.5, this.props.balance))}
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
