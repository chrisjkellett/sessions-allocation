import React from 'react';
import classes from '../Examiners.css';
import {formatAvailability, isPm} from '../../utility';

export const renderName = (examiner, linkHandler) => {
  return (
    <td>
      <span className={classes.NameBtn} onClick={()=> linkHandler(examiner)}>{examiner.name}</span>
    </td>
  )
}


export const renderRoles = (examiner, classes) => {
  return (
    <td>
    {examiner.roles
      .map(role => {
        return <div key={role} className={classes.Roles}>{role}</div>
      })}
    </td>
  )
}

export const renderLevels = (examiner, classes) => {
  return(
    <td>
      {!examiner.levels ? null : examiner.levels
        .map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
      })}
    </td>
  )
}

export const renderAvailability = (examiner, classes) => {
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

export const renderBtns = (examiner, classes, deleteHandler, editHandler) => {
  return(
    <td>
      <span className={classes.Btn} onClick={() => editHandler(examiner)}>edit</span>
      <span className={classes.Bar}> | </span>
      <span className={classes.Btn} onClick={() => deleteHandler(examiner)}>delete</span>
    </td>
  )
}