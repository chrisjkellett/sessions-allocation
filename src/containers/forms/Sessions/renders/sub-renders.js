import React from 'react';
import {generateFormElementArray} from '../../form-utility';
import {generateInputProps, generateStyles, generateErrorMessage, lastNameOnly} from './utility';
import Input from '../../../../components/FormElements/Input/Input';
import classes from '../../../css/forms.css';
import viewCSS from '../../../css/views.css';
import availCSS from './availability.css';

export const renderFormElements = (state, {change}, examiners, sessions) => {
  return (
    generateFormElementArray(state.session)
      .map(element =>{
        return <Input {...generateInputProps(element, state, change, examiners, sessions)} />
      }
    )
  )
}

export const renderBtns = ({cancel}, edit) => {
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
      .filter(e => e.available)
      .map(e => {
        return (
          <tr className={generateStyles(e)} key={e.name}>
            <td>{e.name}</td>
            <td><i className="fas fa-check"></i></td>
          </tr>
          )
        })
  )
}

export const renderUnAvailableExaminers = (examiners) => {
  return (
    examiners
      .filter(e => !e.available)
      .map(e => {
        return (
          <tr className={generateStyles(e)} key={e.name}>
            <td>{e.name}</td>
            <td className={availCSS.ErrorLog}>{generateErrorMessage(e)}</td>
          </tr>
          )
        })
  )
}

export const renderSameDaySessions = (sameDaySessions) => {
  return (
    sameDaySessions
      .map(s => {
        return (
          <tr className={viewCSS.Row} key={s.id}>
            <td>{s.venue} 
              <span className={availCSS.Lighter}>{s.type}</span>
            </td>
            <td>{s.time}</td>
            <td className={viewCSS.Levels}>{s.levels.map(l => {
              return <span key={l} className={viewCSS.Icons}>{l}</span>
              })}
            </td>
            <td>{lastNameOnly(s.examiners)}</td>
          </tr>
          )
        })
  )
}

export const renderFilter = ({filter}) => {
  return(
    <div className={availCSS.RightAlign}>
      <input onChange={filter}/>
    </div>
  )
}