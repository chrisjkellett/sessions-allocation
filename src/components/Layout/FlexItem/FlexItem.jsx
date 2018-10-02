import React from 'react';
import classes from './FlexItem.css';

const FlexItem = ({ children, double }) => {
  const styles = double ? classes.DoubleFlexItem : classes.FlexItem
  return (
     <div className={styles}>
       {children}
     </div>
  )
};

export default FlexItem;