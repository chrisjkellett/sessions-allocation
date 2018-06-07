import React from 'react';
import {Redirect} from 'react-router-dom';
import classes from './SingleExaminer.css';
import {isPm, convertToDate} from '../utility';

export const renderUL = (examiner) => {
  if(examiner === null){
    return <Redirect to='/' />
  }

  else{
    return(
      <div className={classes.SingleExaminer}>
        <div>
          <table className={classes.Table}>
            <tbody>
            {renderSimple(examiner, 'name')}
            {renderSimple(examiner, 'email')}
            {renderArrayAsDayIcons(examiner, 'availability')}
            {renderArray(examiner, 'roles')}
            {renderSimple(examiner, 'id_number')}
            </tbody>
          </table>
        </div>

        <div>
          <table className={classes.Table}>
            <tbody>
            {renderArrayAsIcons(examiner, 'levels')}
            {renderAsDate(examiner, 'last_monitoring')}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const renderSimple = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{id}</td>
      <td className={classes.Data}>{examiner[id]}</td>
    </tr>
  )
}

const renderArray = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{id}</td>
      <td className={classes.Data}>
        {examiner[id].map(item => <span className={classes.ArrayItem} key={item}>{item}</span>)}
      </td>
    </tr>
  )
}

const renderArrayAsIcons = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{id}</td>
      <td className={classes.Data}>
        {examiner[id] ? examiner[id].map(item => <span key={item} className={classes.Icons}>{item}</span>) : null}
      </td>
    </tr>
  )
}

const renderArrayAsDayIcons = (examiner, id) => {
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

const renderAsDate = (examiner, id) => {
  return(
    <tr>
      <td className={classes.Label}>{id}</td>
      <td className={classes.Data}>{convertToDate(examiner[id])}</td>
    </tr>
  )
}
