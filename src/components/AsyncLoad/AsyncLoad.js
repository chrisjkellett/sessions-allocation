import React from 'react';
import classes from './AsyncLoad.css';

const AsyncLoad = ({ children, waitFor }) => {
  return waitFor !== null ? children : (
    <div className={classes.Loading}>Loading</div>
  )
}

export default AsyncLoad
