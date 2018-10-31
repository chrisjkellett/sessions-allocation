import React from 'react';
import classes from './Key.css';

const Key = ({label}) => {
  return <span className={classes.Key}>{label}</span>
}

export default Key;