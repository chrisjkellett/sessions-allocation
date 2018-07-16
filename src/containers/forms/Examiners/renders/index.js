import React from 'react';
import classes from '../Examiners.css';
import {renderBtns, renderFormElements} from './sub-renders';
import EditMode from '../../components/EditMode/EditMode';

export const renderUI = (props, state, changeHandler, cancelHandler, submitHandler) => {
  return(
    <EditMode {...props}>
      <form className={classes.Examiners} onSubmit={submitHandler}>
        <div className={classes.ExaminerFlexContainer}>
          <div className={classes.ExaminerFlexItem}>
            {renderFormElements({...state}, changeHandler, 'personal + roles')}
          </div>
          <div className={classes.ExaminerFlexItem}>
            {renderFormElements({...state}, changeHandler, 'availability + monitoring')}
          </div>
        </div>
          {renderBtns(props.exEdit, cancelHandler, classes)}
      </form>
    </EditMode>
  )
}