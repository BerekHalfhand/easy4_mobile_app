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
      <Container style={{backgroundColor: dP.color.primary}}>
        <Content padder style={{ width: '100%', padding:16}}>
          <View style={{textAlign: 'center'}}>
            {/*<Text style={{...styles.whiteTextColorH, marginBottom: 16}}>*/}
            {/*Группа компаний Easy4*/}
            {/*</Text>*/}
            {/*<Text style={{...styles.whiteTextColor, textDecorationLine: 'underline', marginBottom: 8, display: 'none'}}*/}
            {/*onPress={() => NavigationService.navigate('Feedback')}>*/}
            {/*Онлайн-помощник*/}
            {/*</Text>*/}
            <Autolink style={{...styles.whiteTextColor, fontSize: 24, marginBottom: 8, marginTop: 36, textAlign: 'center'}}
              linkStyle={{color:'#FFFFFF'}}
              text='8 800 707 0009' />
            <Text style={{...styles.whiteTextColor, color: '#D4D4D4', marginBottom: 40, textAlign: 'center'}}>
              Бесплатный номер для звонков по России
            </Text>
            <Autolink style={{...styles.whiteTextColor, fontSize: 24, marginBottom: 8, textAlign: 'center'}}
              linkStyle={{color:'#FFFFFF'}}
              text='+7 (958) 798 1111' />
            <Text style={{...styles.whiteTextColor, color: '#D4D4D4', textAlign: 'center'}}>
              Бесплатный номер для звонков
            </Text>
            <Text style={{...styles.whiteTextColor, color: '#D4D4D4', marginBottom: 40, textAlign: 'center'}}>
              из других стран (с телефона Easy4)
            </Text>
            <Autolink style={{...styles.whiteTextColor, fontSize: 24, marginBottom: 40, textAlign: 'center'}}
              linkStyle={{color:'#FFFFFF'}}
              text='easy4@easy4.pro' />
            <Text style={{...styles.whiteTextColor, color: '#D4D4D4', marginBottom: 8, textAlign: 'center'}}>
              ИЦ "Сколково" Большой бульвар, 42, стр.1, Москва, 121205
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
