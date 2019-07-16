import React from 'react';
import {
  Text,
  Linking
} from 'react-native';
import Screen from './Screen';
import {
  Button,
  Container,
  Content
} from 'native-base';
import {styles, dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import {padding, font, margin} from 'app/utils/helpers';
import { connect } from 'react-redux';
import StandardFooter from 'app/src/elements/Footer';

class Newbie extends Screen{
  constructor(props){
    super(props);
    autoBind(this);
  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  renderContent() {
    return (
      <Container style={styles.container}>
        <Content
          style={styles.content}
          contentContainerStyle={styles.contentCentered}
        >
          <Text style={styles.textBlockH}>Добро пожаловать в</Text>
          <Text style={styles.textBlockH}>Easy4!</Text>
          <Text style={{...styles.textSimple, marginTop: 10}}>Ещё не являетесь нашим</Text>
          <Text style={styles.textSimple}>абонентом?</Text>

          <Button full rounded
            style={{...styles.buttonPrimary, ...padding(10, 5), ...margin(20, 10)}}
            onPress={() => Linking.openURL('https://easy4.pro/shop/')}
          >
            <Text style={styles.textButtonPrimary}>
              Заказать SIM-карту
            </Text>
          </Button>

          <Text style={{...styles.textSimple, ...margin(20, 10)}}>Есть SIM-карта?</Text>

          <Button full rounded
            style={{...styles.buttonPrimary, ...padding(10, 5)}}
            onPress={() => Linking.openURL('https://my.easy4.pro/#')}
          >
            <Text style={styles.textButtonPrimary}>
              Привязать SIM-карту
            </Text>
          </Button>
        </Content>
        <StandardFooter />
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Newbie);
