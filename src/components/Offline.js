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
        this.state.action.payload,
    );
    if (connectionInfo.type !== 'none' && connectionInfo.type !== 'unknown') {
      NetInfo.removeEventListener(
        'connectionChange',
        this.handleFirstConnectivityChange,
      );
      let defaultRoute = 'Home';
      if (this.props.user && this.props.authorized) defaultRoute = 'Main';

      let route = this.state.route && this.state.route != 'Offline' ? this.state.route : defaultRoute;

      // prefer Main for the authorized users
      if (defaultRoute == 'Main' && route == 'Home') route = defaultRoute;

      this.props.dispatch(apiErrorDismiss(this.state.action.payload.errorLabel));
      setTimeout(() => {
        NavigationService.navigate(route);
        this.props.dispatch(apiAction(this.state.action.payload));
      }, 250);
    }
  }

  render() {
    return (
      <Container style={{backgroundColor:'#004d99'}}>
        <Content padder style={{ width: '100%', padding:24}}>
          <View style={{marginTop:32}}>
            <Text style={{color:'#FFFFFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
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
          <View style={{marginTop:8}}>
            <Text style={{color:'#FFFFFF', fontSize: 16, textAlign: 'center'}}>
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
