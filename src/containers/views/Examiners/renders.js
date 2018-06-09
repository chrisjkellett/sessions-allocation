import React from 'react';
import classes from './Examiners.css';
import {isPm, formatAvailability} from '../utility';
import Notification from '../../../components/Misc/Notification';
import * as notificationTypes from '../../../components/Misc/notificationTypes';

export const renderTableContent = (examiners, handleDelete, handleEdit, handleLink) => {
  if(examiners === null){
    return <Notification message={notificationTypes.LOADING} />
  }
  
  else if(examiners.length === 0){
    return <Notification message={notificationTypes.NO_RECORDS} />
  }

  else{
    return (
      examiners.map(examiner => (
        <tr className={classes.Row} key={examiner.name}>
          {renderName(examiner, handleLink)}
          {renderRoles(examiner, classes)}
          {renderLevels(examiner, classes)}
          {renderAvailability(examiner, classes)}
          {renderBtns(examiner, classes, handleDelete, handleEdit)}
        </tr>
    )))
  }
}

const renderName = (examiner, linkHandler) => {
  return (
    <td>
      <span className={classes.NameBtn} onClick={()=> linkHandler(examiner)}>{examiner.name}</span>
    </td>
  )
}


const renderRoles = (examiner, classes) => {
  return (
    <td>
    {examiner.roles
      .map(role => {
        return <div key={role} className={classes.Roles}>{role}</div>
      })}
    </td>
  )
}

const renderLevels = (examiner, classes) => {
  return(
    <td>
      {!examiner.levels ? null : examiner.levels
        .map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
      })}
    </td>
  )
}

const renderAvailability = (examiner, classes) => {
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

const renderBtns = (examiner, classes, deleteHandler, editHandler) => {
  return(
    <td>
      <span className={classes.Btn} onClick={() => editHandler(examiner)}>edit</span>
      <span className={classes.Bar}> | </span>
      <span className={classes.Btn} onClick={() => deleteHandler(examiner.id)}>delete</span>
    </td>
  )
}