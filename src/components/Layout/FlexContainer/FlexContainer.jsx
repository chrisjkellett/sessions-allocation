import React from 'react';
import classes from './FlexContainer.css';

const FlexContainer = ({ children }) => {
  return (
    <div className={classes.FlexContainer}>
      {children}
    </div>
  );
};

export default FlexContainer;