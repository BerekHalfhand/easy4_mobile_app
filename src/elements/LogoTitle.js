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
      borderBottomColor: '#B22222',
    };
  }

  toggleDrawer = () => {
    Keyboard.dismiss();
    this.props.dispatch(readState());

    if (this.props.auth && this.props.auth.accessToken)
      this.props.navigation.openDrawer();
  }

  renderSubtitle(subTitle, subTitleSize, subTitleColor) {
    return (
      <Text numberOfLines={1} style={{color: subTitleColor, textAlign:'center', fontSize: subTitleSize}}>
        { subTitle }
      </Text>
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
    accessToken: PropTypes.string,
  }),
  user: PropTypes.shape({
    msisdns: PropTypes.arrayOf(PropTypes.string),
  }),
};

const mapStateToProps = state => ({ ...state });

export default withNavigation(connect(mapStateToProps)(LogoTitle));
