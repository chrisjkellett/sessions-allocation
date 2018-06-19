import React from 'react';
import classes from '../Sessions.css';
import {renderFormElements, renderBtns} from './sub-renders';

export const renderUI = (state, changeHandler, examiners, submitHandler, cancelHandler) => {
  return(
    <section className={classes.AddSessions}>
      <form className={classes.Examiners} onSubmit={submitHandler}>
        <div className={classes.ExaminerFlexContainer}>
          <div className={classes.ExaminerFlexItem}>
            {renderFormElements(state, changeHandler, examiners)}
          </div>
        </div>
          {renderBtns(cancelHandler)}
        </form>
    </section>
  )
}