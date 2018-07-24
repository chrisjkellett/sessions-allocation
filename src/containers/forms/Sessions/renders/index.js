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
  const {availableExaminers, availableSupport, sameDaySessions} = props;
  const {showAllExaminers, showAllSupport} = state;
  const filterAvailable = availableExaminers.filter(e => e.available);
  const filterSupport = availableSupport.filter(e => e.available);
  return(
    <section>
      <form onSubmit={handlers.submit}>
        <div className={classes.Container}>
          <div className={[classes.Box, classes.FormMode].join(" ")}>
            {renderFormElements(state, handlers, filterAvailable, filterSupport)}
            {renderBtns(handlers, props.sessionForEditing)}
          </div>
          <div className={[classes.Box, classes.ViewMode].join(" ")}>
            <div className={classes.BoxWithMaxHeight}>
              <Table labels={[renderHeader(filterAvailable, 'examiners'), null, renderFilter(handlers.ex_filter, handlers, showAllExaminers, 'showAllExaminers')]}>
                {renderAvailableExaminers(filterAvailable, state, showAllExaminers)}
                {showAllExaminers && renderUnAvailableExaminers(availableExaminers, state)}
              </Table>
            </div>
            <div className={classes.BoxWithMaxHeight}>
            <Table labels={[renderHeader(filterSupport, 'support'), null, renderFilter(handlers.supp_filter, handlers, showAllSupport, 'showAllSupport')]}>
              {renderAvailableExaminers(filterSupport, state, showAllSupport)}
              {showAllSupport && renderUnAvailableExaminers(availableSupport, state)}
            </Table>
            </div>
            {sameDaySessions.length !== 0 &&
            <div className={classes.BoxWithMaxHeight}>
              <p>Other sessions on <span className={availCSS.Bolder}>{calculateDate(state)}</span>
                <span className={availCSS.Count}>{sameDaySessions.length}</span>
              </p>
              <Table labels={['venue', 'time', 'level', 'examiners', 'support']}>
                {renderSameDaySessions(sameDaySessions)}
              </Table>
            </div>}
          </div>
        </div>
        </form>
    </section>
  )
}