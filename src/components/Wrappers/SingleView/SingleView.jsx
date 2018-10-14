import React from 'react';
import classes from './SingleView.css';

const SingleView = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.SingleView}>
        {props.children}
      </div>
    </div>
  )
}

export default SingleView;