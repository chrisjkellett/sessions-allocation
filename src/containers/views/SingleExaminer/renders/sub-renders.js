import React from 'react';
import {isPm, formatLabel, convertToDate, timeAgo, renderTimeAgoClass, formatAvailability} from '../../utility';
import classes from '../SingleExaminer.css';

export const renderSimple = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      <td className={classes.Data}>{examiner[id]}</td>
    </tr>
  )
}

export const renderArray = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{id}</td>
      <td className={classes.Data}>
        {examiner[id].map(item => <span className={classes.ArrayItem} key={item}>{item}</span>)}
      </td>
    </tr>
  )
}

export const renderArrayAsIcons = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      <td className={classes.Data}>
        {examiner[id] ? examiner[id].map(item => <span key={item} className={classes.Icons}>{item}</span>) : null}
      </td>
    </tr>
  )
}

export const renderArrayAsDayIcons = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{id}</td>
      <td className={classes.Data}>
        {formatAvailability([...examiner[id]]).map(item => (
          <span key={item} className={classes.Icons}>{item.substring(0, 3)}<span>{isPm(item)}</span></span>))}
      </td>
    </tr>
  )
}

export const renderAsDate = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      {examiner.monitoring_level ?
      <td className={classes.Data}>
        {convertToDate([...examiner[id]])}
        <div className={classes[renderTimeAgoClass([...examiner[id]])]}>{timeAgo([...examiner[id]])}</div>
      </td> : renderEmpty('not yet monitored', true)}
    </tr>
  )
}

export const renderSessionDate = (sessions, id) => {
  const session = sessions[0];
  return (
     <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      {sessions.length !== 0 ?
      <td className={classes.Data}>
        <div className={classes.SessionItem}>
          <span>{convertToDate([...session.session_date], 'dddd Do MMMM')}</span>
          <span>{session.time}</span>
          <span>{session.venue}</span>
          <span>{session.levels.join(" ") + " " + session.type}</span>
        </div>
      </td> : renderEmpty('no upcoming sessions')}
    </tr>
  )
}

export const renderEmpty = (str, warning) => {
  let warningCl;
  if(warning)
    warningCl = classes.Warning;
  return (
    <td className={classes.Data}>
      <span className={warningCl}>
      {warningCl && <i className="fas fa-exclamation-triangle"></i>}
        {str}
      </span>
    </td>  
  )
}