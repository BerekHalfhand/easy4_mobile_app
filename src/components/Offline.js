import React from 'react';
import Screen from './Screen';
import {View, Text, NetInfo} from 'react-native';
import {Content, Container} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import {styles} from 'app/utils/style/styles';
import {apiAction, apiErrorDismiss} from 'app/src/actions/api';
import NavigationService from 'app/src/services/NavigationService';

class Offline extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
    try {
      this.state = {
        action: props.navigation.state.params.action,
        route: props.navigation.state.params.route,
      };
    }
    catch {
      this.state = {
        action: {},
        route: 'Home',
      };
    }

  }

  static navigationOptions = {
    headerStyle: styles.baseHeader,
    header: null,
    headerBackTitle: null,
  };

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);
  }

  handleFirstConnectivityChange = (connectionInfo) => {
    console.log(
      'First change, type: ' +
        connectionInfo.type +
        ', action: ' +
        this.state.action,
    );
    if (connectionInfo.type !== 'none' && connectionInfo.type !== 'unknown') {
      NetInfo.removeEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );

      let defaultRoute = 'Home';
      if (this.props.user && this.props.user.email && this.props.auth && this.props.auth.accessToken) {
        if (this.props.user.msisdns && this.props.user.msisdns.length)
          defaultRoute = 'Main';
        else
          defaultRoute = 'Newbie';
      }

      let route = this.state.route && this.state.route != 'Offline' ? this.state.route : defaultRoute;

      // prefer Main for the authorized users
      if (defaultRoute == 'Main' && route == 'Home') route = defaultRoute;

      if (this.state.action)
        this.props.dispatch(apiErrorDismiss(this.state.action.payload.errorLabel));
      setTimeout(() => {
        NavigationService.navigate(route);
        if (this.state.action)
          this.props.dispatch(apiAction(this.state.action.payload));
      }, 250);
    }
  }

  renderContent() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} contentContainerStyle={styles.contentCentered}>
          <View style={{marginTop:32}}>
            <Text style={styles.textBlockH}>
              Сеть недоступна
            </Text>
          </View>
          <View style={{marginTop:16, flex: 1, justifyContent: 'center'}}>
            <Icon
              name='wifi'
              size={200}
              color='white'
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={{marginBottom: 8}}>
            <Text style={{...styles.textSimple, textAlign: 'center'}}>
              Для работы приложения требуется подключение к сети Интернет
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Offline);
