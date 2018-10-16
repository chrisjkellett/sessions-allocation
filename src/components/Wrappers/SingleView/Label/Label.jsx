import React from 'react';
import classes from './Label.css';

const SingleItem = ({ label, children, counter }) => {
  return (
    <div className={classes.Children}>
      <div>
        <span>{label}</span>
        {counter && <span>{counter}</span>}  
      </div>
      <div>{children}</div>
    </div>
  )
}

export default SingleItem;