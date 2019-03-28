import React from 'react';
import Screen from './Screen';
import {Platform, KeyboardAvoidingView, ScrollView, WebView} from 'react-native';
import {
  Container
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';

export default class Chatroom extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Чат' />,
  };

  render() {
    const Js = 'const meta = document.createElement(\'meta\'); \
                meta.setAttribute(\'content\', \'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0\'); \
                meta.setAttribute(\'name\', \'viewport\'); document.getElementsByTagName(\'head\')[0].appendChild(meta);';

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={80}
        style={{ flex: 1 }}
        behavior='padding' >
        <WebView
          source={{uri: 'https://crm.easy4.pro/online/easy4helper'}}
          scalesPageToFit={Platform.OS === 'ios' ? true : false}
          injectedJavaScript={Js}
          scrollEnabled
        />
      </KeyboardAvoidingView>
    );
  }
}
