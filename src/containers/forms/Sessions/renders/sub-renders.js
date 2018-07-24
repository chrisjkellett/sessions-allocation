import React from 'react';
import {generateFormElementArray} from '../../form-utility';
import {generateInputProps, generateStyles, generateErrorMessage, lastNameOnly} from './utility';
import Input from '../../../../components/FormElements/Input/Input';
import classes from '../../../css/forms.css';
import viewCSS from '../../../css/views.css';
import availCSS from './availability.css';

export const renderFormElements = (state, {change}, filterAvailable, filterSupport) => {
  return (
    generateFormElementArray(state.session)
      .map(element =>{
        return <Input {...generateInputProps(element, state, change, filterAvailable, filterSupport)} />
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

export const renderAvailableExaminers = (examiners, {session: {levels}}, showAll) => {
  if(examiners.length !== 0){
    return (
      examiners
        .filter(e => e.available)
        .map(e => {
          return (
            <tr className={generateStyles(e)} key={e.name}>
              <td>{e.name}<div>{e.roles.map(r => <span key={r} className={viewCSS.Roles}>{r}</span>)}</div></td>
              <td className={viewCSS.Levels}>{renderLevels(e, levels.value)}</td>
              <td className={availCSS.ErrorLog}>
                <span>
                  <i className="fas fa-check"></i>
                </span>
                </td>
            </tr>
            )
          })
    )
  }

  else if(!showAll){
    return(
      <tr className={viewCSS.NoResults}>
        <td>
          no results
        </td>
        <td></td>
        <td></td>
      </tr>
    )
  }
}

export const renderUnAvailableExaminers = (examiners, {session: {levels}}) => {
  return (
    examiners
      .filter(e => !e.available)
      .map(e => {
        return (
          <tr className={generateStyles(e)} key={e.name}>
            <td>{e.name}</td>
            <td className={viewCSS.Levels}>{renderLevels(e, levels.value)}</td>
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
            <td>{lastNameOnly(s.support)}</td>
          </tr>
          )
        })
  )
}

export const renderFilter = (filter, {showHideAll}, showAll, type) => {
  return(
    <div className={availCSS.RightAlign}>
      <span className={viewCSS.SecondaryBtn} onClick={() => showHideAll(type)}>{showAll ? 'hide unavailable' : 'show all'}</span>
      <input onChange={filter}/>
    </div>
  )
}

export const renderHeader = ({length}, str) => {
  return <span>{str} available<span className={availCSS.Count}>{length}</span></span>
}

export const renderLevels = (e, selectedLevels) => {
  if(e.levels){
    if(e.levels.length < 6){
      return ['YLE', 'KET', 'PET', 'FCE', 'CAE', 'CPE']
        .map(l => {
          return e.levels.includes(l) ?
            <span key={l} className={viewCSS.Icons}>{l}</span> : 
            <span key={l} className={[viewCSS.Icons, viewCSS.DisabledIcons].join(" ")}>{l}</span>
          })
    }

    else{
      return <span className={[viewCSS.Icons, viewCSS.FullSuite].join(" ")}>full suite</span>
    }
  }

  else{
    return null;
  }
}