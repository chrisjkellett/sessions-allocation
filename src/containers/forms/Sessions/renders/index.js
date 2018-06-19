import React from 'react';
import classes from '../Sessions.css';
import {renderFormElements} from './sub-renders';

export const renderUI = (state, changeHandler) => {
  return(
    <section className={classes.AddSessions}>
      <form className={classes.Examiners}>
        <div className={classes.ExaminerFlexContainer}>
          <div className={classes.ExaminerFlexItem}>
            {renderFormElements(state, changeHandler)}
          </div>
        </div>
          {/* {renderBtns(props.examinerForEditing, cancelHandler, classes)} */}
        </form>
    </section>
  )
}