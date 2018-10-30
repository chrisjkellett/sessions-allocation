import React from 'react';
import classes from '../Header.css';
import {getLogData, formatError} from './utility';

export const renderUpdateLog = (update, {type, action}) => {
  const data = getLogData(type, update);   
  return (
    <div className={classes.UpdateAlert}>
      <i className="far fa-check-circle"></i>
      <span className={classes.Action}>{action}</span>
      <b>{data.primary}</b>
      <span className={classes.Secondary}>{data.secondary}</span>
    </div>
  );
}

export const renderErrorLog = (error, mapOfLog) => {  
  return (
    <div className={classes.ErrorAlert}>
      <i className="fas fa-exclamation-triangle"></i>
      <span className={classes.Action}>
        <span>error {mapOfLog.action} {mapOfLog.type} - </span>
        <span>{formatError(error, mapOfLog)}</span>
      </span>
    </div>
  );
}