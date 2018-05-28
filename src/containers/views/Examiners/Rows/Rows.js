import React from 'react';
import classes from './Rows.css';
import {objectToArray, abbreviateDays} from './utility';
import {levelKeys, availabilityKeys} from '../../../../store/data';

const rows = (props) => {
  const mapLevelsToArray = objectToArray(props.examiner.levels, levelKeys);
  const mapAvailabilityToArray = objectToArray(props.examiner.availability, availabilityKeys)

  return(
    <tr className={classes.Row}>
      <td>{props.examiner.name}</td>

      <td>
        {props.examiner.SE_id}
        {props.examiner.roles
          .filter(role => role !== 'Speaking Examiner')
          .map(role => {
            return <div key={role} className={classes.Roles}>{role}</div>
        })}
      </td>

      <td>
        {mapLevelsToArray
          .map(level => {
            return <span key={level} className={classes.Icons}>{level}</span>
        })}
      </td>

      <td>
      {mapAvailabilityToArray
          .map(day => {
            return <span key={day} className={classes.Icons}>{abbreviateDays(day)}</span>
        })}
      </td>
    </tr>
  )
}

export default rows;