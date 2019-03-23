import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation';
import { Container, Content, Icon, ListItem, Button, Body, Left, Right } from 'native-base';
import {dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import {logout} from 'app/src/actions';
import PropTypes from 'prop-types';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import NavigationService from 'app/src/services/NavigationService';

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    backgroundColor: dP.color.primary
  },
  headerName: {
    color: dP.color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerPhone: {
    color: dP.color.white,
  },
  itemsContainer: {
    padding: 15,
    fontSize: 14,
  },
  itemStyle: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemText: {
    paddingLeft: 15
  },
  userPic: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  mockIcon: {
    backgroundColor: dP.color.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
  }

});

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onPressLogout () {
    this.props.navigation.closeDrawer();
    this.props.dispatch(logout());
  }

  onPressBalance (phone) {
    this.navigateTo('IncreaseBalance', {phone: phone});
  }

  onPressTariffs () {
    this.navigateTo('Tariff');
  }

  navigateTo = ( route, params ) => {
    this.props.navigation.closeDrawer();
    NavigationService.navigate(route, params);
  };

  render() {
    if (!this.props.user) return false;

    const {
      firstName,
      lastName,
      phone,
    } = this.props.user;
    return (
      <Container>
        <View style={styles.headerContainer}>
          <View style={{flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'flex-end', padding: 15}} >
            <View style={styles.userPic}></View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 15}}>
              <Text style={styles.headerName}>{firstName + ' ' + lastName || 'John Doe'}</Text>
              <Text style={styles.headerPhone}>{this.props.user.selectedPhone || ''}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={() => this.onPressBalance(phone)}>Пополнить баланс</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={() => this.navigateTo('Chatroom')}>Наши контакты</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={this.onPressTariffs}>Наши тарифы</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={() => this.navigateTo('Home')}>О приложении</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={this.onPressLogout}>Выйти</Text>
          </View>
        </View>
      </Container>

    );
  }
}

Drawer.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
};

Drawer.defaultProps = {
  user: {
    firstName: '',
    lastName: '',
    phone: '',
  },
};

const mapStateToProps = state => ({ ...state });

export default withNavigation(connect(mapStateToProps)(Drawer));
