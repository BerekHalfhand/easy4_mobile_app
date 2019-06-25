import React from 'react';
import Screen from './Screen';
import {Platform, WebView} from 'react-native';
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
          <QRCode
            value={this.state.text}
            size={this.dimensions.width - 32}
            bgColor='black'
            fgColor='white'/>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(QRcode);
