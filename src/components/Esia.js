import React from 'react';
import Screen from './Screen';
import {Platform, WebView} from 'react-native';
import {
  Container,
} from 'native-base';
import LogoTitle from 'app/src/elements/LogoTitle';
import {esiaAuth} from 'app/src/actions';
import { connect } from 'react-redux';
import {styles} from 'app/utils/style/styles';
import {getQueryStringParams} from 'app/utils/helpers';

class Esia extends Screen {
  constructor(props) {
    super(props);
    let link = props.navigation.state && props.navigation.state.params
      ? props.navigation.state.params.link
      : null;

    this.state = {
      link,
      done: false,
    };
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Госуслуги' />,
  };

  onNavigationStateChange(webViewState){
    if (!webViewState || !webViewState.url) return false;

    let params = getQueryStringParams(webViewState.url);
    if (params && params.code && params.type === 'esia' && !this.state.done) {
      this.setState({done: true});
      this.props.dispatch(esiaAuth(params.code));
    }
  }

  renderContent() {
    return (
      <Container style={styles.container}>
        <WebView
          source={{uri:this.state.link}}
          scalesPageToFit={Platform.OS === 'ios' ? true : false}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          scrollEnabled
        />
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Esia);
