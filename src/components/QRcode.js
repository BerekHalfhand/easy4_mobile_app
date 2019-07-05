import React from 'react';
import Screen from './Screen';
import {View} from 'react-native';
import {
  Container,
  Content
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';
import {esiaAuth} from 'app/src/actions';
import { connect } from 'react-redux';
import {styles} from 'app/utils/style/styles';
import QRCode from 'react-native-qrcode';

class QRcode extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      text: 'http://facebook.github.io/react-native/',
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='QR код' />,
  };

  renderContent() {
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View style={{
            backgroundColor: 'white',
            height: this.dimensions.width - 32,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <QRCode
              value={this.state.text}
              size={this.dimensions.width - 64}
              bgColor='black'
              fgColor='white'/>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(QRcode);
