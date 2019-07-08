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

class QR extends Screen {
  constructor(props) {
    super(props);
    let orderId = '';
    try {
      orderId = props.navigation.state.params.orderId;
    }
    catch {
      orderId = 'Error! Wrong order ID';
    }
    console.log('orderId', orderId);
    this.state = {
      orderId: orderId,
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
              value={this.state.orderId}
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

export default connect(mapStateToProps)(QR);
