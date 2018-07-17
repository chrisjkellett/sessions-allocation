import React from 'react';
import {isPm, formatLabel, convertToDate, timeAgo, renderTimeAgoClass, formatAvailability} from '../../utility';
import classes from '../SingleSession.css';
import Wrapper from '../../../../components/Misc/Wrapper/Wrapper';

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
    <Wrapper>
      {renderSimple(examiner, 'name')} 
      {renderSimple(examiner, 'id_number')}
      {renderArray(examiner, 'roles')}
      {renderArrayAsIcons(examiner, 'levels')}
      {renderAsMonitoring(examiner, 'last_monitoring')}
    </Wrapper>
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

export const renderArrayAsIcons = (session, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      <td className={classes.Data}>
        {session[id] ? session[id].map(item => <span key={item} className={classes.Icons}>{item}</span>) : null}
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

export const renderAsMonitoring = (session, id) => {
  return(
    <tr>
    <td className={classes.Label}>{formatLabel(id)}</td>
    {session.monitoring_level ?
      <td className={classes.Data}>
        <div className={classes[renderTimeAgoClass([...session[id]])]}>{timeAgo([...session[id]])}</div>
      </td> : renderEmpty('not yet monitored', true)}
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

export const renderArrivalTime = (session, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      <td className={classes.Data}></td>
    </tr>
  )
}