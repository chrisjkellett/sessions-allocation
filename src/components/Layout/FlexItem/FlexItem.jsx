import React from 'react';
import classes from './FlexItem.css';

const FlexItem = ({ children }) => {
  return (
     <div className={classes.FlexItem}>
       {children}
     </div>
  )
};

export default FlexItem;