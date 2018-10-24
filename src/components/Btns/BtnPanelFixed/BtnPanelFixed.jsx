import React from 'react';
import classes from './BtnPanelFixed.css';

const BtnPanelFixed = ({ children }) => {
  return (
    <div className={classes.BtnPanel}>
      {children}
    </div>
  )
}

export default BtnPanelFixed;