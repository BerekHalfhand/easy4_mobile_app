import React from 'react';
import {Text, View} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {styles, dP} from '../../utils/style/styles';

export default class NavBack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tintColor: dP.color.accent,
      fontSize: 16,
    };
  }

  render() {
    const {
      tintColor,
      fontSize,
    } = Object.assign(this.state, this.props);

    return (
      <View style={{padding: 10}}>
        <Text style={{color: tintColor, fontSize: fontSize}}>
          <FontAwesome>{Icons.chevronLeft}</FontAwesome>
        </Text>
      </View>
    );
  }
}
