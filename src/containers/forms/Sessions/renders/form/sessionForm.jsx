import React from 'react';
import {renderFormElements, renderBtns} from '../sub-renders';
import classes from '../../../../css/views.css';

export const renderSessionForm = (state, handlers, filterAvailable, filterSupport, props) => {
  const {sessionForEditing} = props;
  return (
    <div className={[classes.Box, classes.FormMode].join(" ")}>
      {renderFormElements(state, handlers, filterAvailable, filterSupport)}
      {renderBtns(handlers, sessionForEditing)}
    </div>
  )
}