import React from 'react';
import Screen from './Screen';
import {Platform, WebView} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';

export default class DocPolicy extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Политика обработки персональных данных' />,
  };

  render() {
    return (
      <Container>
        <Content></Content>
      </Container>
    );
  }
}
