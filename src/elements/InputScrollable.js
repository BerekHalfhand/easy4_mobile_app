import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {ScrollIntoView} from 'react-native-scroll-into-view';
import InputWithIcon from 'app/src/elements/InputWithIcon';
import InputWithMask from 'app/src/elements/InputWithMask';
import {dP} from 'app/utils/style/styles';

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
    
    const hasErrors = formikProps.touched.hasOwnProperty(formikKey) && formikProps.errors.hasOwnProperty(formikKey);

    return (
      <ScrollIntoView ref={this.ref}>
        {this.props.mask ? (
          <InputWithMask
            onBlur={formikProps.handleBlur(formikKey)}
            onFocus={this.scrollFieldIntoView}
            hasErrors={hasErrors}
            error={hasErrors ? formikProps.errors[formikKey] : ''}
            {...this.props}
          />
        ) : (
          <InputWithIcon
            onChangeText={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            onFocus={this.scrollFieldIntoView}
            hasErrors={hasErrors}
            error={hasErrors ? formikProps.errors[formikKey] : ''}
            {...this.props}
          />
        )}
      </ScrollIntoView>
    );
  }
}

InputScrollable.propTypes = {
  formikKey: PropTypes.string,
  formikProps: PropTypes.object,
  mask: PropTypes.string,
};
