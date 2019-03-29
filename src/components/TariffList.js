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
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Тарифы' />,
  };

  render(){
    return(
      <Container style={{backgroundColor:'#004d99'}}>
        <Content padder style={{ width: '100%', padding:24}}>
        
          <TariffPane tariff='travel' showButton={true} />

          <TariffPane tariff='connect' showButton={true} />

        </Content>
        <StandardFooter />
      </Container>
    );
  }
}
