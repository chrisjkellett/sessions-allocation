import React from 'react';
import classes from '../../Venues.css';

const SubmitBtns = ({ label, edit, cancel }) => {
  return (
    <div className={classes.SubmitBtns}>
      <button>{edit ? 'Save Changes' : label}</button>
      <span onClick={cancel}>cancel</span>
    </div>
  )
};

export default SubmitBtns;