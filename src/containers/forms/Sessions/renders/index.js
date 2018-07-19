import React from 'react';
import classes from '../../../css/views.css';
import {renderFormElements, renderBtns, renderAvailableExaminers, renderUnAvailableExaminers} from './sub-renders';
import Table from '../../../../components/FormElements/Table/Table';
import {examinerAvailableHeaders} from '../../../../store/app-data/table-headers';

export const renderUI = (state, changeHandler, props, submitHandler, cancelHandler) => {
  const {examiners, allSessions, availableExaminers} = props;
  return(
    <section>
      <form onSubmit={submitHandler}>
        <div className={classes.Container}>
          <div className={classes.Box}>
            {renderFormElements(state, changeHandler, examiners, allSessions)}
            {renderBtns(cancelHandler, props.sessionForEditing)}
          </div>
          <div className={classes.Box}>
            <Table labels={examinerAvailableHeaders}>
              {renderAvailableExaminers(availableExaminers, state)}
              {renderUnAvailableExaminers(availableExaminers, state)}
            </Table>

            <Table labels={['venue', 'time', 'examiners']}>
            </Table>
          </div>
        </div>
        </form>
    </section>
  )
}