import React from 'react';
import classes from '../Venues.css';

export const renderUI = (state, changeHandler, props, submitHandler, cancelHandler) => {
  return(
    <section className={classes.AddSessions}>
      <h1>Venues</h1>
    </section>
  )
}