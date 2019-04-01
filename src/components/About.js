import React from 'react';
import Screen from './Screen';
import {Text, View, Image} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';
import {styles, dP} from 'app/utils/style/styles';
import { expo } from 'app/app.json';

export default class About extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='О приложении' />,
  };

  render() {
    const {version} = expo;
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} contentContainerStyle={styles.contentCentered}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 96, height: 128, resizeMode: 'contain'}}
              source={require('app/assets/image/logo3x.png')}
            />
            <Text style={{...styles.whiteTextColor, fontSize: 20, letterSpacing: 2, marginTop: 24, textAlign: 'justify'}}>
              {version}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
