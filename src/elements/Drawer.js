import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {withNavigation} from 'react-navigation';
import { Container } from 'native-base';
import {dP} from 'app/utils/style/styles';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { logout, resetState } from 'app/src/actions';
import PropTypes from 'prop-types';
// import { DrawerItems, SafeAreaView } from 'react-navigation';
import NavigationService from 'app/src/services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {phoneFormat} from 'app/utils/helpers';

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    backgroundColor: dP.color.primary,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    padding: 15,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemText: {
    paddingLeft: 15,
    flex: 3
  },
  userPic: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'none',
    paddingRight: 15,
  },
  mockIcon: {
    backgroundColor: dP.color.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onPressLogout () {
    const { navigation, auth, dispatch } = this.props;
    navigation.closeDrawer();
    if (auth && auth.accessToken)
      dispatch(logout(auth.accessToken));
    else
      dispatch(resetState());

    NavigationService.navigate('Home');
  }

  onPressBalance (phone) {
    this.navigateTo('IncreaseBalance', {phone: phone});
  }

  onPressTariffs () {
    this.navigateTo('TariffList');
  }

  navigateTo = ( route, params ) => {
    this.props.navigation.closeDrawer();
    NavigationService.navigate(route, params);
  };

  render() {
    if (!this.props.user) return false;

    const {
      fullName,
      selectedPhone,
    } = this.props.user;

    const increaseBalance = (
      <TouchableOpacity style={styles.itemStyle} onPress={() => this.onPressBalance(phoneFormat(selectedPhone))}>
        <View style={styles.icon}>
          <Icon name='money' color={dP.color.primary} size={24} />
        </View>
        <Text style={styles.itemText}>Пополнить баланс</Text>
      </TouchableOpacity>
    );

    const phoneText = (selectedPhone ? <Text style={styles.headerPhone}>{phoneFormat(selectedPhone)}</Text> : null);

    return (
      <Container>
        <View style={styles.headerContainer}>
          <View style={styles.userPic}></View>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={styles.headerName}>{fullName || ''}</Text>
            {phoneText}
          </View>
        </View>
        <View style={styles.itemsContainer}>
          {selectedPhone ? increaseBalance : null}
          <TouchableOpacity style={styles.itemStyle} onPress={() => this.navigateTo('Contacts')}>
            <View style={styles.icon}>
              <Icon name='envelope-open' color={dP.color.primary} size={24} />
            </View>
            <Text style={styles.itemText}>Наши контакты</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemStyle} onPress={this.onPressTariffs}>
            <View style={styles.icon}>
              <Icon name='briefcase' color={dP.color.primary} size={24} />
            </View>
            <Text style={styles.itemText}>Наши тарифы</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemStyle} onPress={() => this.navigateTo('About')}>
            <View style={styles.icon}>
              <Icon name='question-circle-o' color={dP.color.primary} size={24} />
            </View>
            <Text style={styles.itemText}>О приложении</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemStyle} onPress={this.onPressLogout}>
            <View style={styles.icon}>
              <Icon name='sign-out' color={dP.color.primary} size={24} />
            </View>
            <Text style={styles.itemText}>Выйти</Text>
          </TouchableOpacity>
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
