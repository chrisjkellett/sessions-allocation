import React from 'react';
import classes from './Rows.css';
import {objectToArray} from './utility';
import {levelKeys} from '../../../../store/data';

const rows = (props) => {
  const mapLevelsToArray = objectToArray(props.examiner.levels, levelKeys);

  return(
    <tr className={classes.Row}>
      <td>{props.examiner.name}</td>
      <td>{props.examiner.SE_id}</td>
      <td>
        {mapLevelsToArray.map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
        })}
      </td>
      <td></td>
    </tr>
  )
}

export default rows;