import React from 'react';
import classes from '../Examiners.css';
import {Redirect} from 'react-router-dom';
import {renderBtns, renderFormElements} from './sub-renders';
import * as routes from '../../../../store/app-data/routes';

export const renderUI = (props, state, changeHandler, cancelHandler, submitHandler) => {
  if(props.examinerForEditing === null && props.location.pathname !== routes.ADD_EXAMINER)
    return <Redirect to={routes.LOGIN_PAGE} />
  else
    return(
      <form className={classes.Examiners} onSubmit={submitHandler}>
          <div className={classes.ExaminerFlexContainer}>
            <div className={classes.ExaminerFlexItem}>
              {renderFormElements({...state}, changeHandler, 'personal + roles')}
            </div>
            <div className={classes.ExaminerFlexItem}>
              {renderFormElements({...state}, changeHandler, 'availability + monitoring')}
            </div>
          </div>
            {renderBtns(props.examinerForEditing, cancelHandler, classes)}
        </form>
    )
}