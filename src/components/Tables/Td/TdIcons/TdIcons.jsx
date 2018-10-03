import React from 'react';
import classes from './TdIcons.css';

const TdIcons = ({ array, subContent }) => {
  return (
    <td>
      {array && array.map(item => <span className={classes.Icons}>{item}</span>)}
      {subContent && subContent}
    </td>
  )
}

export default TdIcons;
