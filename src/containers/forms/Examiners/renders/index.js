import React from 'react';
import classes from '../Examiners.css';
import {renderBtns, renderFormElements} from './sub-renders';
import EditMode from '../../components/EditMode/EditMode';
import moment from 'moment';

export const renderUI = (props, state, changeHandler, cancelHandler, submitHandler, toggleContracts) => {
  const { showContracts } = state;
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
          {state.editing &&
          <div className={classes.ExaminerFlexItem}>
            <div>
              <p>current contracts</p>
              {props.exEdit['contract_start'] && <div className={classes.Contract}>
                {'☑ ' + moment([props.exEdit['contract_start']].join("-"), 'YYYY-MM-DD').format('Do MMMM')
                + ' - ' +
                moment([props.exEdit['contract_end']].join("-"), 'YYYY-MM-DD').format('Do MMMM')}
              </div>}
              {!showContracts && <button onClick={toggleContracts}>add new contract</button>}
            </div>
            {showContracts && renderFormElements({...state}, changeHandler, 'contracts')}
            {showContracts && 
              <div className={classes.SubmitBtns}>
                <span onClick={toggleContracts}>cancel</span>
              </div>
            }
          </div>
          }
        </div>
          {renderBtns(props.exEdit, cancelHandler, classes)}
      </form>
    </EditMode>
  )
}