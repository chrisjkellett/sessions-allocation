import React from 'react';
import classes from './ShowHideBtn.css';

const ShowHideBtn = ({ handler, type, label } ) => {
  return (
    <div className={classes.ShowBtn} onClick={() => handler(type)}>{"+" + label}</div>
  )
}

export default ShowHideBtn;