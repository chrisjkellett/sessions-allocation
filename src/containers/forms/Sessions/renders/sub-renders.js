import React from 'react';
import {generateFormElementArray} from '../../form-utility';
import {generateInputProps} from './utility';
import Input from '../../../../components/FormElements/Input/Input';
import classes from '../Sessions.css';

export const renderFormElements = (state, changeHandler, examiners) => {
  return (
    generateFormElementArray(state.session)
      .map(element =>{
        return <Input {...generateInputProps(element, state, changeHandler, examiners)} />
      }
    )
  )
}

export const renderBtns = (cancel, edit) => {
  return(
    <div className={classes.SubmitBtns}>
      <button>{edit ? 'Save Changes' : 'Add Session'}</button>
      <span onClick={() => cancel()}>cancel</span>
    </div>
  )
}