import React from 'react';
import classes from './ShowBtn.css';

const ShowBtn = ({ handler, type, label } ) => {
  return (
    <div className={classes.ShowBtn} onClick={() => handler(type)}>{"+" + label}</div>
  )
}

export default ShowBtn;