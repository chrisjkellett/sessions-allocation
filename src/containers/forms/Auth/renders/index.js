import React from 'react';
import Input from '../../../../components/FormElements/Input/Input';
import {generateFormElementArray} from '../../../../gen-utility';
import {generateInputProps} from '../utility';

export const renderForm = (state, inputHandler) => {
  return (
    generateFormElementArray(state)
      .map(element =>{
        return <Input {...generateInputProps(element, state, inputHandler)} />
      }
    )
  )
}