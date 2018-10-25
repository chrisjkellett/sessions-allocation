import React from 'react';
import classes from './SingleView.css';

const SingleView = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.SingleView}>
        <div className={classes.Close} onClick={props.close}>
          ☒
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default SingleView;