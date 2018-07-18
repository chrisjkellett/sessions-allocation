import React from 'react';
import classes from '../../../css/views.css';
import {renderFormElements, renderBtns, renderTableContent} from './sub-renders';
import Table from '../../../../components/FormElements/Table/Table';
import {examinerTableHeaders} from '../../../../store/app-data/table-headers';

export const renderUI = (state, changeHandler, props, submitHandler, cancelHandler) => {
  const {examiners, allSessions} = props;
  return(
    <section>
      <form onSubmit={submitHandler}>
        <div className={classes.Container}>
          <div className={classes.Box}>
            {renderFormElements(state, changeHandler, examiners, allSessions)}
            {renderBtns(cancelHandler, props.sessionForEditing)}
          </div>
          <div className={classes.Box}>
            <Table labels={examinerTableHeaders}>
              {renderTableContent(examiners)}
            </Table>
          </div>
        </div>
        </form>
    </section>
  )
}