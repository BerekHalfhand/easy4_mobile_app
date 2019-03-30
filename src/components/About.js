import React from 'react';
import Screen from './Screen';
import {Text, View, Image} from 'react-native';
import {
  Container,
  Content,
  Body
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
      <Container style={{backgroundColor: dP.color.primary}}>
        <View style={{ height: '100%', padding:24, justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 150, height: 200, resizeMode: 'contain'}}
              source={require('app/assets/image/logo3x.png')}
            />
            <Text style={{...styles.whiteTextColor, marginTop: 24, textAlign: 'justify'}}>
              {version}
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}
