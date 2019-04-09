import React from 'react';
import {Text, View, Keyboard, TouchableOpacity} from 'react-native';
import { ActionSheet } from 'native-base';
import {withNavigation} from 'react-navigation';
import { connect } from 'react-redux';
import {dP} from 'app/utils/style/styles';
import {readState} from 'app/src/actions';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {phoneFormat} from 'app/utils/helpers';
import { selectPhone, fetchBalance } from 'app/src/actions';

class LogoTitle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      background: '#004d99',
      titleColor: '#FFFFFF',
      subTitleColor: '#FFFFFF',
      titleSize: 20,
      subTitleSize: 13,
      borderBottomColor: '#B22222',
    };
  }

  toggleDrawer = () => {
    Keyboard.dismiss();
    console.log(this.state, this.props);
    this.props.dispatch(readState());

    if (this.props.auth && this.props.auth.authorized)
      this.props.navigation.openDrawer();
  }

  selectPhone = msisdn => {
    this.props.dispatch(selectPhone(msisdn));
    this.setState({subTitle: phoneFormat(msisdn)});
    this.getBalance(msisdn);
  }

  getBalance = async (phone) => {
    const { auth, dispatch } = this.props;
    dispatch(fetchBalance(phone, auth.accessToken));
  }

  onPressNumbers = () => {
    console.log(this.props);
    if (this.props.user && this.props.user.msisdns && this.props.user.msisdns.length > 1) {
      let phones = this.props.user.msisdns.map(v => phoneFormat(v));

      ActionSheet.show(
        {
          options: phones.concat(['Отмена']),
          cancelButtonIndex: this.props.user.msisdns.length,
          title: 'Посмотреть баланс'
        },
        buttonIndex => {
          if (buttonIndex == this.props.user.msisdns.length) //Отмена
            return false;

          let phone = this.props.user.msisdns[buttonIndex];

          this.selectPhone(phone);
        }
      );
    }
  }

  renderSubtitle(subTitle, subTitleSize, subTitleColor) {
    const chevron = (this.props.user && this.props.user.msisdns && this.props.user.msisdns.length ? (
      <MaterialCommunityIcons
        name='chevron-down'
        size={18}
        color={dP.color.white}
      />
    ) : null );

    return (
      <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 5}} onPress={this.onPressNumbers}>
        <Text numberOfLines={1} style={{color: subTitleColor, textAlign:'center', fontSize: subTitleSize}}>
          { subTitle }
        </Text>
        { chevron }
      </TouchableOpacity>
    );
  }

  render() {
    const {
      background,
      titleColor,
      subTitleColor,
      titleSize,
      subTitleSize,
      title,
      subTitle,
      borderBottomColor
    } = Object.assign({}, this.props, this.state);

    return (
      <View style={{ backgroundColor:background, borderBottomColor: borderBottomColor }}>
        <TouchableOpacity onPress={this.toggleDrawer} style={{flex: 1, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={{color: titleColor, textAlign:'center', fontSize: titleSize}}>{ title }</Text>
        </TouchableOpacity>
        {subTitle ? this.renderSubtitle(subTitle, subTitleSize, subTitleColor) : null}
      </View>
    );
  }
}

LogoTitle.propTypes = {
  auth: PropTypes.shape({
    authorized: PropTypes.bool,
  }),
  user: PropTypes.shape({
    msisdns: PropTypes.arrayOf(PropTypes.string),
  }),
};

const mapStateToProps = state => ({ ...state });

export default withNavigation(connect(mapStateToProps)(LogoTitle));
