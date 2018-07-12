import React from 'react';
import {isPm, formatLabel, convertToDate, timeAgo, renderTimeAgoClass, formatAvailability} from '../../utility';
import classes from '../SingleSession.css';

export const renderSimple = (session, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      <td className={classes.Data}>{session[id]}</td>
    </tr>
  )
}

export const renderExaminer = (session, examiner, id) => {
  return(
    
    <tr key={id}>
      <td className={classes.Label}>{formatLabel(id)}</td>
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

export const renderAsDate = (session, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      {session.session_date ?
      <td className={classes.Data}>
        {convertToDate([...session[id]])}
        <div className={classes[renderTimeAgoClass([...session[id]])]}>{timeAgo([...session[id]])}</div>
      </td> : null}
    </tr>
  )
}
