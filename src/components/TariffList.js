import React from 'react';
import { View, Text, Switch, FlatList } from 'react-native';
import { Container, Content, Icon, ListItem, Button, Body, Left, Right } from 'native-base';
import {styles} from 'app/utils/style/styles';
import StandardFooter from 'app/src/elements/Footer';
import LogoTitle from 'app/src/elements/LogoTitle';
import TariffPane from 'app/src/elements/TariffPane';
import Screen from './Screen';

export default class TariffList extends Screen {
  constructor(props){
    super(props);
    this.state = {
      fakeTariff1: {
        title: 'Тариф Трэвел 1',
        subTitle: 'Easy4 Travel',
        text: 'Тарифный план «Travel 1» («Трэвел 1») линейки Easy4 Travel, предназначен для туристов и деловых людей, часто совершающих международные поездки.',
        description: [
          {key: 'Без абонентской платы'},
          {key: '1 ₽ за Мб*'},
          {key: '2 ₽ за минуту*'},
          {key: 'Единый тариф во всех странах территории обслуживания, включая Россию'},
        ],
      },
      fakeTariff2: {
        title: 'Коннект 999',
        subTitle: 'Easy4 Connect',
        text: 'Тарифный план «999» для мобильного интернета линейки Easy4 Connect, предназначен для использования в роутерах, смартфонах, планшетах и других «умных» устройствах на территории России и за рубежом.',
        description: [
          {key: 'Только интернет'},
          {key: 'Без абонентской платы'},
          {key: 'Пакет 3 Гб за 999 ₽*'},
          {key: 'Более 60 стран обслуживания, включая Россию'},
        ],
      },
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Тарифы' />,
  };

  render(){
    return(
      <Container style={{backgroundColor:'#004d99'}}>
        <Content padder style={{ width: '100%', padding:24}}>
          <TariffPane
            title={this.state.fakeTariff1.title}
            subTitle={this.state.fakeTariff1.subTitle}
            text={this.state.fakeTariff1.text}
            description={this.state.fakeTariff1.description} />

          <TariffPane
            title={this.state.fakeTariff2.title}
            subTitle={this.state.fakeTariff2.subTitle}
            text={this.state.fakeTariff2.text}
            description={this.state.fakeTariff2.description} />
        </Content>
        <StandardFooter />
      </Container>
    );
  }
}
