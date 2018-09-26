import React from 'react';
import classes from './TdIcons.css';

const TdIcons = ({ data }) => {
  return(
    <td>
      {data !== undefined && data.map(item => <span className={classes.Icons}>{item}</span>)}
    </td>
  )
}

export default TdIcons;
