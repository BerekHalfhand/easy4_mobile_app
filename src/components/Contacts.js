import React from 'react';
import Screen from './Screen';
import {Text, View} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';
import {styles, dP} from 'app/utils/style/styles';
import Autolink from 'react-native-autolink';

export default class Contacts extends Screen {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Контакты' />,
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content}>
          <Autolink style={{...styles.textBlockH, marginBottom: 8, textAlign: 'center'}}
            linkStyle={{color: dP.color.white}}
            text='8 800 707 0009' />
          <Text style={{...styles.textSimple, color: '#D4D4D4', marginBottom: 40, textAlign: 'center'}}>
              Бесплатный номер для звонков по России
          </Text>
          <Autolink style={{...styles.textBlockH, marginBottom: 8, textAlign: 'center'}}
            linkStyle={{color: dP.color.white}}
            text='+7 (958) 798 1111' />
          <Text style={{...styles.textSimple, color: '#D4D4D4', textAlign: 'center'}}>
              Бесплатный номер для звонков
          </Text>
          <Text style={{...styles.textSimple, color: '#D4D4D4', marginBottom: 40, textAlign: 'center'}}>
              из других стран (с телефона Easy4)
          </Text>
          <Autolink style={{...styles.textBlockH, marginBottom: 40, textAlign: 'center'}}
            linkStyle={{color: dP.color.white}}
            text='easy4@easy4.pro' />
          <Text style={{...styles.textSimple, color: '#D4D4D4', textAlign: 'center'}}>
              ИЦ {'"'}Сколково{'"'} Большой бульвар, 42, стр.1, Москва, 121205
          </Text>
        </Content>
      </Container>
    );
  }
}
