import React from 'react';
import {isPm, formatLabel, convertToDate, timeAgo, renderTimeAgoClass} from '../../utility';
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
        {examiner[id].map(item => (
          <span key={item} className={classes.Icons}>{item.substring(0, 3)}<span>{isPm(item)}</span></span>))}
      </td>
    </tr>
  )
}

export const renderAsDate = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{formatLabel(id)}</td>
      <td className={classes.Data}>
        {convertToDate([...examiner[id]])}
        <div className={classes[renderTimeAgoClass([...examiner[id]])]}>{timeAgo([...examiner[id]])}</div>
      </td>
    </tr>
  )
}
