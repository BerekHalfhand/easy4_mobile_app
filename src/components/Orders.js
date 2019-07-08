import React from 'react';
import Screen from './Screen';
import {FlatList, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {
  Container,
  Content
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import autoBind from 'react-autobind';
import LogoTitle from 'app/src/elements/LogoTitle';
import {fetchOrders} from 'app/src/actions';
import { connect } from 'react-redux';
import {styles, dP} from 'app/utils/style/styles';
import NavigationService from 'app/src/services/NavigationService';

const localStyles = StyleSheet.create({
  itemStyle: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemText: {
    paddingLeft: 15,
    flex: 3,
    color: 'white'
  },
  icon: {
    width: 30,
    height: 30,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Orders extends Screen {
  constructor(props) {
    super(props);
    autoBind(this);
    this.fetchOrderList();
  }

  fetchOrderList = async (limit = 100, offset = 0) => {
    if (this.props.accessToken && this.props.userId)
      this.props.dispatch(fetchOrders(this.props.userId, limit, offset));
  }

  static navigationOptions = {
    ...Screen.navigationOptions,
    headerTitle: <LogoTitle title='Заказы' />,
  };

  renderContent() {
    const orders = (this.props.orders ? (
      <FlatList
        data={this.props.orders}
        renderItem={({item}) => (
          <TouchableOpacity style={localStyles.itemStyle} onPress={() => NavigationService.navigate('QRcode', {orderId: item._id})}>
            <View style={localStyles.icon}>
              <MaterialCommunityIcons name='qrcode' color={dP.color.white} size={24} />
            </View>
            <Text style={localStyles.itemText}>{item._id}</Text>
          </TouchableOpacity>
        )}
      />
    ) : null);

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          {orders}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({...state.auth, ...state.user});

export default connect(mapStateToProps)(Orders);
