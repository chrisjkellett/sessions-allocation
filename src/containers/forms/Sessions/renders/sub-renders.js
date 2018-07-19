import React from 'react';
import {generateFormElementArray} from '../../form-utility';
import {generateInputProps, generateStyles, generateErrorMessage} from './utility';
import Input from '../../../../components/FormElements/Input/Input';
import classes from '../../../css/forms.css';

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

export const renderAvailableExaminers = (examiners) => {
  return (
    examiners
      .filter(e => !e.avail.failsAvailability && !e.avail.failsLevel)
      .map(e => {
        return (
          <tr className={generateStyles(e)} key={e.name}>
            <td>{e.name}</td>
            <td className={classes.RightAlign}><i className="far fa-calendar-check"></i></td>
          </tr>
          )
        })
  )
}

export const renderUnAvailableExaminers = (examiners) => {
  return (
    examiners
      .filter(e => e.avail.failsAvailability || e.avail.failsLevel)
      .map(e => {
        return (
          <tr className={generateStyles(e)} key={e.name}>
            <td>{e.name}</td>
            <td>{generateErrorMessage(e)}</td>
          </tr>
          )
        })
  )
}