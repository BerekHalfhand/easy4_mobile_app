import React from 'react';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';
import { dP } from 'app/utils/style/styles';
import { Field } from 'formik';
import StringMask from 'string-mask';

export default class InputWithMask extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(v, p, mask) {
    // console.log(p, v, mask);
    if (mask) // it's meant to be used in numerical fields, but could be expanded
      v = StringMask.process(v.replace(/\D+/g, ''), mask).result;

    // console.log('value to set', v);
    p.form.setFieldValue(p.field.name, v);
    return v;
  }

  render() {
    return (
      <Field name={this.props.formikKey}>
        {fieldProps => (
          <TextField
            textColor={dP.color.white}
            baseColor={this.props.hasErrors ? dP.color.error : '#ABABAB'}
            tintColor={this.props.hasErrors ? dP.color.error : dP.color.accent}
            errorColor={dP.color.error}
            value={fieldProps.field.value}
            {...this.props}
            onChangeText={ value => this.handleChange(value, fieldProps, this.props.mask) }
          />
        )}
      </Field>
    );
  }
}

InputWithMask.propTypes = {
  formikKey: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  label: PropTypes.string,
  hasErrors: PropTypes.bool,
};

InputWithMask.defaultProps = {
  label: 'Input',
  hasErrors: false,
};
