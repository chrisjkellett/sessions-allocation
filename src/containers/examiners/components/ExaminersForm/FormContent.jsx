import React from 'react';
import { object, bool, number } from 'prop-types';
import { Input } from '../index.js';
import { generateFormElementArray } from './utility';


const FormContent = ({ values, handlers, inputProps, shouldValidate, group }) => {
  return (
    generateFormElementArray(values)
      .filter(element => element.config.group === group)
      .map(element => <Input { ...inputProps(element, shouldValidate, handlers) } />)
  );
};

FormContent.propTypes = {
  values: object.isRequired,
  handlers: object.isRequired,
  shouldValidate: bool.isRequired,
  group: number
}

export default FormContent;