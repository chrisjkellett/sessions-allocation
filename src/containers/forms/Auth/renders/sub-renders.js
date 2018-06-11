import React from 'react';
import classes from '../Auth.css';
import {LOGIN_FAIL} from '../../../../store/app-data/errors';

export const renderError = (error) => {
  if(error)
    return <span className={classes.Error}>{LOGIN_FAIL}</span>
  else 
    return null;
}