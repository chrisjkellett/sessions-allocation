import React from 'react';
import classes from '../../../css/views.css';
import {renderSessionForm} from './form/sessionForm';
import {renderViews} from './views/';
 
export const renderUI = (state, props, handlers) => {
  const {availableExaminers, availableSupport} = props;
  const filterAvailable = availableExaminers.filter(e => e.available);
  const filterSupport = availableSupport.filter(e => e.available);
  return(
    <section>
      <form onSubmit={handlers.submit}>
        <div className={classes.Container}>
          {renderSessionForm(state, handlers, filterAvailable, filterSupport, props)}
          {renderViews(state, filterAvailable, filterSupport, handlers, props)}
        </div>
        </form>
    </section>
  )
}