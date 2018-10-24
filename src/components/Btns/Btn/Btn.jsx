import React from 'react';
import classes from './Btn.css';

const Btn = ({ label, handler }) => {
  return (
    <div className={classes.BtnPanel}>
      <button onClick={handler}>{label}</button> 
    </div>
  )
}

export default Btn;