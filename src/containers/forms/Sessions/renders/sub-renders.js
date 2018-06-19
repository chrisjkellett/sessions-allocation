import React from 'react';
import {generateFormElementArray} from '../../form-utility';
import {generateInputProps} from './utility';
import Input from '../../../../components/FormElements/Input/Input';

export const renderFormElements = (state, changeHandler) => {
  return (
    generateFormElementArray(state.session)
      .map(element =>{
        return <Input {...generateInputProps(element, state, changeHandler)} />
      }
    )
  )
}