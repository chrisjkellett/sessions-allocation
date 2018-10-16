import React from 'react';
import classes from './Counter.css';

const Counter = ({ count }) => {
  return <span className={classes.Counter}>{count}</span>
}

export default Counter;