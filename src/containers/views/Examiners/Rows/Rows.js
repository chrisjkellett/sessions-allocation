import React from 'react';
import classes from './Rows.css';
import {objectToArray} from './utility';

const rows = (props) => {
  return(
    <tr className={classes.Row}>
      <td>{props.examiner.name}</td>
      <td>{props.examiner.SE_id}</td>
      <td>{objectToArray(props.examiner.levels)}</td>
    </tr>
  )
}

export default rows;