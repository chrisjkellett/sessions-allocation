import React from 'react';
import classes from './SubmitBtns.css';
import ExpandBtn from '../ExpandBtn/ExpandBtn';

const SubmitBtns = ({ label, handlers, edit, expand }) => {
  return (
    <div className={classes.SubmitBtns}>
      <div>
        <button>{edit ? 'Save Changes' : label}</button>
        <span onClick={handlers.cancel}>cancel</span>
      </div>
      <div className={classes.Expand}>
        {expand && <ExpandBtn expand={handlers.expand} />}
      </div>
    </div>
  )
};

export default SubmitBtns;