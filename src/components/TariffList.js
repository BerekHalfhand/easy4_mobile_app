import React from 'react';
import { Container, Content } from 'native-base';
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
      <Container style={styles.container}>
        <Content padder style={styles.content}>

          <TariffPane tariff='travel' showButton={true} />

          <TariffPane tariff='connect' showButton={true} />

        </Content>
        <StandardFooter />
      </Container>
    );
  }
}
