import React from 'react';
import classes from '../Examiners.css';
import {formatAvailability, isPm} from '../../utility';
import viewCSS from '../../../css/views.css';

export const renderNameAndRoles = (examiner, linkHandler) => {
  return (
    <td>
      <span className={classes.NameBtn} onClick={()=> linkHandler(examiner)}>{examiner.name}</span>
      <div>{examiner.roles.map(r => <span key={r} className={classes.Roles}>{r}</span>)}</div>
    </td>
  )
}

export const renderLevels = (examiner) => {
  return(
    <td>
      {!examiner.levels ? null : examiner.levels
        .map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
      })}
    </td>
  )
}

export const renderAvailability = (examiner) => {
  return(
    <td>
      {formatAvailability([...examiner.availability])
        .map(day => {
          return <span key={day} className={classes.Icons}>
            {day.substring(0, 3)}
            <span>{isPm(day)}</span>
          </span>
      })}
    </td>
  )
}

export const renderBtns = (examiner, deleteHandler, editHandler, isAuthenticated) => {
  return(
    <td>
      <span className={classes.Btn} onClick={() => editHandler(examiner)}>edit</span>
      {isAuthenticated && <span className={classes.Bar}> | </span>}
      {isAuthenticated && <span className={classes.Btn} onClick={() => deleteHandler(examiner)}>delete</span>}
    </td>
  )
}

export const renderFilterBtn = (showFilters, {toggleFilters}) => {
  return(
    <span onClick={toggleFilters} className={viewCSS.TertiaryBtn}>{showFilters ? 'turn filters off' : 'turn filters on'}</span>
  )
}