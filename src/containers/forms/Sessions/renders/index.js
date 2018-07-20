import React from 'react';
import classes from '../../../css/views.css';
import {
  renderFormElements, 
  renderBtns, 
  renderAvailableExaminers, 
  renderUnAvailableExaminers,
  renderSameDaySessions} from './sub-renders';
import {calculateDate} from './utility';
import Table from '../../../../components/FormElements/Table/Table';
import {examinerAvailableHeaders} from '../../../../store/app-data/table-headers';
import availCSS from './availability.css';

export const renderUI = (state, changeHandler, props, submitHandler, cancelHandler) => {
  const {examiners, sessions, availableExaminers, sameDaySessions} = props;
  return(
    <section>
      <form onSubmit={submitHandler}>
        <div className={classes.Container}>
          <div className={classes.Box}>
            {renderFormElements(state, changeHandler, examiners, sessions)}
            {renderBtns(cancelHandler, props.sessionForEditing)}
          </div>
          <div className={classes.Box}>
            <Table labels={examinerAvailableHeaders}>
              {renderAvailableExaminers(availableExaminers, state)}
              {renderUnAvailableExaminers(availableExaminers, state)}
            </Table>

            {sameDaySessions.length !== 0 &&
            <div>
              <p>Other sessions on <span className={availCSS.Bolder}>{calculateDate(state)}</span>
                <span className={availCSS.Count}>{sameDaySessions.length}</span>
              </p>
              <Table labels={['venue', 'time', 'level', 'examiners']}>
                {renderSameDaySessions(sameDaySessions)}
              </Table>
            </div>}
          </div>
        </div>
        </form>
    </section>
  )
}