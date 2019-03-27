import React from 'react';
import {Text, View, Keyboard, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import { connect } from 'react-redux';
import {readState} from 'app/src/actions';
import PropTypes from 'prop-types';

class LogoTitle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      background: '#004d99',
      titleColor: '#FFFFFF',
      subTitleColor: '#FFFFFF',
      titleSize: 20,
      subTitleSize: 13,
      title: '',
      subTitle: '',
      borderBottomColor: '#B22222',
    };
  }

  toggleDrawer = () => {
    Keyboard.dismiss();
    this.props.dispatch(readState());

    if (this.props.authorized)
      this.props.navigation.openDrawer();
  }

  renderSubtitle(subTitle, subTitleSize, subTitleColor) {
    return (
      <Text numberOfLines={1} style={{color: subTitleColor, textAlign:'center', fontSize: subTitleSize}}>{ subTitle }</Text>
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
    } = Object.assign(this.state, this.props);

    return (
      <View style={{ backgroundColor:background, borderBottomColor: borderBottomColor }}>
        <TouchableOpacity onPress={this.toggleDrawer}>
          <Text numberOfLines={1} style={{color: titleColor, textAlign:'center', fontSize: titleSize}}>{ title }</Text>
          {subTitle ? this.renderSubtitle(subTitle, subTitleSize, subTitleColor) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

LogoTitle.propTypes = {
  authorized: PropTypes.bool,
};

LogoTitle.defaultProps = {
  authorized: false,
};

const mapStateToProps = state => state.auth;

export default withNavigation(connect(mapStateToProps)(LogoTitle));
