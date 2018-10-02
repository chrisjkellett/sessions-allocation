import React from 'react';
import classes from './ShowHideBtn.css';

const ShowHideBtn = ({ handler, type, label, hide } ) => {
  return (
    <div className={hide ? classes.HideBtn : classes.ShowBtn} onClick={() => handler(type)}>
      { label ? "+" + label : "hide this menu" }
    </div>
  )
}

export default ShowHideBtn;