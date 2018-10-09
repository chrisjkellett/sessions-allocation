import React from 'react';
import classes from './IsNotEmpty.css';

const IsNotEmpty = ({ data, children, show }) => {
  return data.length === 0 && !show 
    ? <div className={classes.NoRecords}>No records found</div>
    : children
};

export default IsNotEmpty;