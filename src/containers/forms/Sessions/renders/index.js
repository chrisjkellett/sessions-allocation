import React from 'react';
import classes from '../../../css/views.css';
import {
  renderFormElements, 
  renderBtns, 
  renderAvailableExaminers, 
  renderUnAvailableExaminers,
  renderFilter,
  renderHeader,
  renderSameDaySessions} from './sub-renders';
import {calculateDate} from './utility';
import Table from '../../../../components/FormElements/Table/Table';
import availCSS from './availability.css';

export const renderUI = (state, props, handlers) => {
  const {examiners, sessions, availableExaminers, availableSupport, sameDaySessions} = props;
  const filterAvailable = availableExaminers.filter(e => e.available);
  const filterSupport = availableSupport.filter(e => e.available);
  return(
    <section>
      <form onSubmit={handlers.submit}>
        <div className={classes.Container}>
          <div className={[classes.Box, classes.FormMode].join(" ")}>
            {renderFormElements(state, handlers, examiners, sessions)}
            {renderBtns(handlers, props.sessionForEditing)}
          </div>
          <div className={[classes.Box, classes.ViewMode].join(" ")}>
            <div className={classes.BoxWithMaxHeight}>
              <Table labels={[renderHeader(filterAvailable, 'examiners'), null, renderFilter(handlers.ex_filter, 'examiners')]}>
                {renderAvailableExaminers(filterAvailable, state)}
                {renderUnAvailableExaminers(availableExaminers, state)}
              </Table>
            </div>
            <div className={classes.BoxWithMaxHeight}>
            <Table labels={[renderHeader(filterSupport, 'support'), null, renderFilter(handlers.supp_filter, 'support')]}>
              {renderAvailableExaminers(filterSupport, state)}
              {renderUnAvailableExaminers(availableSupport, state)}
            </Table>
            </div>
            {sameDaySessions.length !== 0 &&
            <div className={classes.BoxWithMaxHeight}>
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