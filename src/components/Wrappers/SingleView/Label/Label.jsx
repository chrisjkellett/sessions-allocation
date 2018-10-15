import React from 'react';
import classes from './Label.css';

const SingleItem = ({ label, children }) => {
  return (
    <div className={classes.Children}>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  )
}

export default SingleItem;