import React from 'react';
import classes from './UpdateLog.css';
import { getLogData } from '../../renders/utility';

const UpdateLog = ({update, map}) => {
  const data = getLogData(map, update);
  return (
    <div className={classes.UpdateAlert}>
      <i className="far fa-check-circle"></i>
      <div className={classes.Message}>
        <span>successfully</span>
        <span>{map && map.action}</span>
        <span>{map && map.type}</span>
        <span>for</span>
        <span className={classes.Bold}>{data.primary}</span>
        <span>{data.secondary && data.secondary}</span>
      </div>
    </div>
  );
}

export default UpdateLog;