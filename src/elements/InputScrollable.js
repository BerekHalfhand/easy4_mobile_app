import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {ScrollIntoView} from 'react-native-scroll-into-view';
import InputWithIcon from 'app/src/elements/InputWithIcon';

export default class InputScrollable extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  scrollFieldIntoView = () => {
    setTimeout(() => this.ref.current.scrollIntoView({ align: 'top' }), 250);
  };

  render() {
    const {
      formikKey,
      formikProps,
    } = this.props;

    return (
      <ScrollIntoView ref={this.ref}>
        <InputWithIcon
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
          onFocus={this.scrollFieldIntoView}
          {...this.props}
        />
        <Text style={{ color: 'red' }}>
          {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        </Text>
      </ScrollIntoView>
    );
  }
}

InputScrollable.propTypes = {
  formikKey: PropTypes.string,
  formikProps: PropTypes.object,
};
