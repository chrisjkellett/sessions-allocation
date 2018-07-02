import React from 'react';
import classes from '../Sessions.css';
// import {momentReadyArr} from '../../../forms/form-utility';
// import moment from 'moment';

export const renderDate = (session) => {
  return  (
    <td>
     {session.session_date}
    </td>
  )
}

export const renderTime = (session) => {
  return (
    <td>
      {session.time}
    </td>
  )
}

export const renderType = (session) => {
  return (
    <td>
      {session.type}
    </td>
  )
}

export const renderVenue = (session) => {
  return (
    <td>
      {session.venue}
    </td>
  )
}

export const renderLevels = (session) => {
  return (
    <td>
      {session.levels
        .map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
      })}
    </td>
  )
}

export const renderExaminers = (session) => {
  return (
    <td>
      {session.examiners.join(" + ")}
    </td>
  )
}

export const renderSupport = (session) => {
  return (
    <td>
      {session.support.join(" + ")}
    </td>
  )
}

export const renderBtns = (session, deleteHandler, editHandler) => {
  return(
    <td>
      <span className={classes.Btn} onClick={() => editHandler(session)}>edit</span>
      <span className={classes.Bar}> | </span>
      <span className={classes.Btn} onClick={() => deleteHandler(session.id)}>delete</span>
    </td>
  )
}