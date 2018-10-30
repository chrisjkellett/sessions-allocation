import React from 'react';
import classes from './ErrorLog.css';
import { formatError } from '../utility';

const ErrorLog = ({error, map}) => {
  return (
    <div className={classes.ErrorAlert}>
      <i className="fas fa-exclamation-triangle"></i>
      <span>
        <span>error {map.action} {map.type} - </span>
        <span>{formatError(error, map)}</span>
      </span>
    </div>
  );
}

export default ErrorLog;