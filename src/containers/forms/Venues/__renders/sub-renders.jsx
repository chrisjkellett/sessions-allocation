import React from 'react';
import classes from '../Venues.css';
import {generateFormElementArray} from '../../form-utility';
import Input from '../../../../components/FormElements/Input/Input';
import {generateInputProps} from './utility';

export const renderTableContent = (data) => {
  return (
    data.map(v => (
      <tr className={classes.Row} key={v.name}>
        <td>
          {v.name}
          <span>{v.address}</span>
        </td>
        <td>{v.type}</td>
        <td>+34({v.phone})</td>
      </tr>
  )))
}

export const renderFormElements = (state, changeHandler, group) => {
  return (
    generateFormElementArray(state.venue)
      .map(element =>{
        return <Input {...generateInputProps(element, state, changeHandler)} />
      }
    )
  )
}

export const renderBtns = (cancel, edit) => {
  return(
    <div className={classes.SubmitBtns}>
      <button>{edit ? 'Save Changes' : 'Add Venue'}</button>
      <span onClick={() => cancel()}>cancel</span>
    </div>
  )
}