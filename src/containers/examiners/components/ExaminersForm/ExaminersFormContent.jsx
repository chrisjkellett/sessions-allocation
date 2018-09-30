import React from 'react';
import { object, bool, number } from 'prop-types';
import { Input } from '../../../../components/Forms';
import { generateInputProps } from './inputProps';
import { generateFormElementArray } from '../../../utility';


const ExaminersFormContent = ({ values, handlers, shouldValidate, group }) => {
  return (
    generateFormElementArray(values)
      .filter(element => element.config.group === group)
      .map(element => <Input {...generateInputProps(element, shouldValidate, handlers)} />)
  );
};

ExaminersFormContent.propTypes = {
  values: object.isRequired,
  handlers: object.isRequired,
  shouldValidate: bool.isRequired,
  group: number
}

export default ExaminersFormContent;