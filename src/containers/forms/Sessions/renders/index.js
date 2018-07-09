import React from 'react';
import classes from '../Sessions.css';
import {renderFormElements, renderBtns} from './sub-renders';

export const renderUI = (state, changeHandler, props, submitHandler, cancelHandler) => {
  return(
    <section className={classes.AddSessions}>
      <form className={classes.Examiners} onSubmit={submitHandler}>
        <div className={classes.ExaminerFlexContainer}>
          <div className={classes.ExaminerFlexItem}>
            {renderFormElements(state, changeHandler, props.examiners, props.allSessions)}
          </div>
        </div>
          {renderBtns(cancelHandler, props.sessionForEditing)}
        </form>
    </section>
  )
}