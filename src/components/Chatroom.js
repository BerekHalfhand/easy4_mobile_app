import React from 'react';
import Screen from './Screen';
import {WebView} from 'react-native';
import {styles} from 'app/utils/style/styles';

export default class Chatroom extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  render() {
    return (
      <WebView
        source={{uri: 'https://crm.easy4.pro/online/easy4helper'}}
        style={{marginTop: 20}}
      />
    );
  }
}
