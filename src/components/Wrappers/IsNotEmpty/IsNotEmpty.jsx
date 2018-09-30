import React from 'react';
import classes from './IsNotEmpty.css';

const IsNotEmpty = ({ data, children }) => {
  return data.length === 0 
    ? <div className={classes.NoRecords}>No records found</div>
    : children
};

export default IsNotEmpty;