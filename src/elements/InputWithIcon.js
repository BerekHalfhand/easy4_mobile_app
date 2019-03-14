import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  TextField
} from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import {dP} from '../../utils/style/styles';

export default class InputWithIcon extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      icon: props.icon,
      isPassword: props.isPassword
    };
  }

  toggleIcon = () => {
    if (!this.props.isPassword) return false;

    let newState;
    if (this.state.isPassword) {
      newState = {
        icon: this.props.altIcon,
        isPassword: false
      };
    } else {
      newState = {
        icon: this.props.icon,
        isPassword: true
      };
    }

    this.setState(newState);

  };

  renderIcon() {
    if (this.state.icon) {
      return (
        <Icon style={styles.icon}
          name={this.state.icon}
          size={this.props.iconSize}
          color={this.props.iconColor}
          onPress={this.toggleIcon}
        />
      );
    }
  }

  render() {
    return (
      <View>
        <TextField
          secureTextEntry={this.state.isPassword}
          textColor={dP.color.white}
          baseColor={'#ABABAB'}
          tintColor={dP.color.accent}
          {...this.props}
        />
        {this.renderIcon()}
      </View>
    );
  }
}

export const styles = StyleSheet.create({

  icon: {
    position: 'absolute',
    top: 33,
    right: 0
  }

});

InputWithIcon.propTypes = {
  icon: PropTypes.string,
  altIcon: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  label: PropTypes.string,
  isPassword: PropTypes.bool,
};

InputWithIcon.defaultProps = {
  icon: '',
  altIcon: '',
  iconSize: 25,
  iconColor: dP.color.white,
  label: 'Input',
  isPassword: false,
};
