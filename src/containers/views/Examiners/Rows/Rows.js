import React from 'react';
import classes from './Rows.css';
import {objectToArray} from './utility';
import {levelKeys, roleKeys} from '../../../../store/data';

const rows = (props) => {
  const mapLevelsToArray = objectToArray(props.examiner.levels, levelKeys);
  const mapRolesToArray = objectToArray(props.examiner.roles, roleKeys)

  return(
    <tr className={classes.Row}>
      <td>{props.examiner.name}</td>

      <td>
        {props.examiner.SE_id}
        {mapRolesToArray
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

      <td></td>
    </tr>
  )
}

export default rows;