import React from 'react';
import {generateFormElementArray, generateInputProps} from './utility';
import Input from '../../../components/FormElements/Input/Input';

export const renderFormElements = (state, changeHandler, group) => {
  return (
    generateFormElementArray(state.examiner)
      .filter(element => {
        return element.config.group === group;
      })
      .map(element =>{
        return <Input {...generateInputProps(element, state, changeHandler)} />
      }
    )
  )
}


export const renderBtns = (edit, cancel, classes) => {
  return(
    <div className={classes.SubmitBtns}>
      <button>{edit ? 'Save changes' : 'Add Examiner'}</button>
      <span onClick={() => cancel()}>cancel</span>
    </div>
  )
}