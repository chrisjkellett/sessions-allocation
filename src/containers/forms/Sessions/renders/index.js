import React from 'react';
import classes from '../Sessions.css';
import {renderFormElements} from './sub-renders';

export const renderUI = (state, changeHandler, examiners) => {
  return(
    <section className={classes.AddSessions}>
      <form className={classes.Examiners}>
        <div className={classes.ExaminerFlexContainer}>
          <div className={classes.ExaminerFlexItem}>
            {renderFormElements(state, changeHandler, examiners)}
          </div>
        </div>
          {/* {renderBtns(props.examinerForEditing, cancelHandler, classes)} */}
        </form>
    </section>
  )
}