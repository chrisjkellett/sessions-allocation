import React from 'react';
import classes from './ErrorMessage.css';
import { formatError } from '../utility.js';

const ErrorMessage = ({ error }) => {
  return (
    <div className={classes.ErrorWrapper}>
      {error && 
          <div className={classes.Error}>
            <i class="fas fa-exclamation-triangle"></i>
            <span>{formatError(error)}</span>
          </div>
      }
    </div>
  )
}

export default ErrorMessage;