import React from 'react';
import classes from './PostControls.css';

const PostControls = ({ hasControls }) => {
  return hasControls === undefined || hasControls.controls === undefined ? null : (
    <div className={classes.PostControls}>
      {hasControls.controls.map(control => <span key={control.label} onClick={hasControls.handler}>{control.label}</span>)}
    </div>
  )
}

export default PostControls;