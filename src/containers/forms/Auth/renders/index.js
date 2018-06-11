import React from 'react';
import Input from '../../../../components/FormElements/Input/Input';
import {generateFormElementArray} from '../../../../gen-utility';
import {generateInputProps} from '../utility';
import {renderError} from './sub-renders';

export const renderForm = (state, inputHandler, submitHandler, error) => {
  return (
    <form onSubmit={submitHandler}>
      {generateFormElementArray(state)
        .map(element =>{
          return <Input {...generateInputProps(element, state, inputHandler)} />
        }
      )}
      <button>login</button>
      {renderError(error)}
    </form>
  )
}