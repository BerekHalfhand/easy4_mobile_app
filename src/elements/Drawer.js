import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavigationActions, withNavigation} from 'react-navigation';
import { Container, Content, Icon, ListItem, Button, Body, Left, Right } from 'native-base';
import {dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

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

  logout () {
    this.props.dispatch({
      type: 'RESET',
      payload: {}
    });
    this.navigateToScreen('Home');
  }

  navigateToScreen = ( route ) => {
    // console.log('navigateToScreen', route, this.props.navigation);
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.closeDrawer();
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const {
      firstName,
      secondName,
      lastName,
      phone,
      email,
    } = this.props.user;
    return (
      <Container>
        <View style={styles.headerContainer}>
          <View style={{flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'flex-end', padding: 15}} >
            <View style={styles.userPic}></View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 15}}>
              <Text style={styles.headerName}>{firstName + ' ' + lastName || 'Павел Галанкин'}</Text>
              <Text style={styles.headerPhone}>{phone || '+7 (916) 258-5555'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={() => this.navigateToScreen('IncreaseBalance')}>Пополнить баланс</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={() => this.navigateToScreen('Home')}>Наши контакты</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={() => this.navigateToScreen('Home')}>Наши тарифы</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={() => this.navigateToScreen('Home')}>О приложении</Text>
          </View>
          <View style={styles.itemStyle}>
            <View style={styles.mockIcon}></View>
            <Text style={styles.itemText} onPress={this.logout}>Выйти</Text>
          </View>
        </View>
      </Container>

    );
  }
}

const mapStateToProps = state => ({ ...state });

export default withNavigation(connect(mapStateToProps)(Drawer));
