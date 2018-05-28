import React from 'react';
import classes from './Rows.css';
import {isPm} from './utility';

const rows = (props) => {
  return(
    <tr className={classes.Row}>
      <td>{props.examiner.name}</td>

      <td>
        {props.examiner.id_number}
        {props.examiner.roles
          .filter(role => role !== 'Speaking Examiner')
          .map(role => {
            return <div key={role} className={classes.Roles}>{role}</div>
        })}
      </td>

      <td>
        {!props.examiner.levels ? null : props.examiner.levels
          .map(level => {
            return <span key={level} className={classes.Icons}>{level}</span>
        })}
      </td>

      <td>
      {!props.examiner.availability ? null : props.examiner.availability
          .map(day => {
            return <span key={day} className={classes.Icons}>
              {day.substring(0, 3)}
              {isPm(day) ? <span>pm</span> : <span>am</span>}
            </span>
        })}
      </td>

      <td>
        <span onClick={props.delete}>delete</span>
      </td>
    </tr>
  )
}

export default rows;