import React from 'react';
import classes from '../../../../../css/icons.css';

const SessionLevels = ({ session }) => {
  return (
     <td>
      {session.levels
        .map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
      })}
    </td>
  )
}

export default SessionLevels;