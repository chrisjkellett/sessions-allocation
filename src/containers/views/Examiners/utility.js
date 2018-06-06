import React from 'react';

export const examinerTableHeaders = [
  'examiner name',
  'roles',
  'levels',
  'availability',
  null
]

export const renderName = (examiner) => {
  return (
    <td>{examiner.name}</td>
  )
}


export const renderRoles = (examiner, classes) => {
  return (
    <td>
    {examiner.id_number}
    {examiner.roles
      .filter(role => role !== 'Speaking Examiner')
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
      {!examiner.availability ? null : examiner.availability
        .map(day => {
          return <span key={day} className={classes.Icons}>
            {day.substring(0, 3)}
            <span>{isPm(day)}</span>
          </span>
      })}
    </td>
  )
}

const isPm = (day) => {
  if(day.substring(day.length - 2, day.length) === 'pm'){
    return 'pm';
  }

  if(day.substring(day.length - 2, day.length) === 'am'){
    return 'am';
  }
}

export const renderBtns = (examiner, classes, deleteHandler, editHandler) => {
  return(
    <td>
      <span className={classes.Btn} onClick={() => editHandler(examiner)}>edit</span>
      <span className={classes.Bar}> | </span>
      <span className={classes.Btn} onClick={() => deleteHandler(examiner.id)}>delete</span>
    </td>
  )
}

export const formatURL = (str) => {
  return str.toLowerCase().replace(" ", "");
}


