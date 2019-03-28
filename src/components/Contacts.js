import React from 'react';
import Screen from './Screen';
import {Text, Linking} from 'react-native';
import {
  Container,
  Content,
  Body
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';
import {styles, dP} from 'app/utils/style/styles';
import NavigationService from 'app/src/services/NavigationService';
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
      <Container style={{backgroundColor: dP.color.primary}}>
        <Content padder style={{ width: '100%', padding:24}}>
          <Body>
            <Text style={{...styles.whiteTextColorH, marginBottom: 16}}>
              Группа компаний Easy4
            </Text>
            <Text style={{...styles.whiteTextColor, textDecorationLine: 'underline', marginBottom: 8}}
              onPress={() => NavigationService.navigate('Chatroom')}>
              Онлайн-помощник
            </Text>
            <Autolink style={{...styles.whiteTextColor, marginBottom: 8}}
              linkStyle={{textDecorationLine: 'underline'}}
              text='8 800 707 0009 - бесплатный номер для звонков по России' />
            <Autolink style={{...styles.whiteTextColor, marginBottom: 8}}
              linkStyle={{textDecorationLine: 'underline'}}
              text='+7 (958) 798 1111 - бесплатный номер для звонков из других стран (с телефона Easy4)' />
            <Autolink style={{...styles.whiteTextColor, marginBottom: 8}}
              linkStyle={{textDecorationLine: 'underline'}}
              text='Email: easy4@easy4.pro' />
            <Text style={{...styles.whiteTextColor, marginBottom: 8}}>
              Адрес: ИЦ "Сколково" Большой бульвар, 42, стр.1, Москва, 121205
            </Text>
          </Body>
        </Content>
      </Container>
    );
  }
}
