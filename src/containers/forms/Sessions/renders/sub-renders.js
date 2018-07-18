import React from 'react';
import {generateFormElementArray} from '../../form-utility';
import {generateInputProps, examinerAdvancedCheck} from './utility';
import Input from '../../../../components/FormElements/Input/Input';
import classes from '../Sessions.css';
import viewCSS from '../../../css/views.css';

export const renderFormElements = (state, changeHandler, examiners, sessions) => {
  return (
    generateFormElementArray(state.session)
      .map(element =>{
        return <Input {...generateInputProps(element, state, changeHandler, examiners, sessions)} />
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

export const renderTableContent = ([...examiners], {session}) => {
  return (
    examinerAdvancedCheck(examiners, session).map(e => (
      <tr className={viewCSS.Row} key={e.name}>
        <td>{e.name}</td>
        <td></td>
      </tr>
  )))
}