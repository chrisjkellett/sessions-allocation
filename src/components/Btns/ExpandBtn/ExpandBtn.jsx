import React from 'react';
import { func } from 'prop-types';
import classes from './ExpandBtn.css';

const ExpandBtn = ({ expand }) => {
  return (
    <div className={classes.ExpandBtn}>
      <span onClick={expand}>↔</span>
    </div>
  );
};

ExpandBtn.propTypes = {
  expand: func
}

export default ExpandBtn;