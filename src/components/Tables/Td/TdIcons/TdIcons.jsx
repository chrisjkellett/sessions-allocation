import React from 'react';
import classes from './TdIcons.css';

const TdIcons = ({ array }) => {
  return (
    <td>
      {array && array.map(item => <span className={classes.Icons}>{item}</span>)}
    </td>
  )
}

export default TdIcons;
