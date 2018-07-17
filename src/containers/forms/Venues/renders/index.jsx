import React from 'react';
import classes from '../Venues.css';

export const renderUI = (state, changeHandler, props, submitHandler, cancelHandler) => {
  return(
    <section className={classes.Venues}>
      <div className={classes.Box}>Venues</div>
      <div className={classes.Box}>Venues Form</div>
    </section>
  )
}