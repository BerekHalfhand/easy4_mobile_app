import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import {dP, styles} from 'app/utils/style/styles';

export default class InputWithIcon extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      icon: props.icon,
      isPassword: props.isPassword,
      focused: false,
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

  focus = () => { this.input.focus(); }

  renderIcon() {
    if (this.state.icon) {
      return (
        <Icon style={styles.inputIcon}
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
          ref={input => this.input = input}
          secureTextEntry={this.state.isPassword}
          textColor={dP.color.white}
          baseColor={this.props.hasErrors ? dP.color.error : '#ABABAB'}
          tintColor={this.props.hasErrors ? dP.color.error : dP.color.accent}
          errorColor={dP.color.error}
          {...this.props}
        />
        {this.renderIcon()}
      </View>
    );
  }
}

InputWithIcon.propTypes = {
  icon: PropTypes.string,
  altIcon: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  label: PropTypes.string,
  isPassword: PropTypes.bool,
  hasErrors: PropTypes.bool,
};

InputWithIcon.defaultProps = {
  icon: '',
  altIcon: '',
  iconSize: 25,
  iconColor: dP.color.white,
  label: 'Input',
  isPassword: false,
  hasErrors: false,
};
