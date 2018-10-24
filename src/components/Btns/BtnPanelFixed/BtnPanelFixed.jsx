import React from 'react';
import classes from './BtnPanelFixed.css';

const BtnPanelFixed = ({ children, hidden }) => {
  return hidden ? null : (
    <div className={classes.BtnPanel}>
      {children}
    </div>
  )
}

export default BtnPanelFixed;