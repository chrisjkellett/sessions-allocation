import React from 'react';
import Table from '../../../../../components/FormElements/Table/Table';
import classes from '../../../../css/views.css';
import {
  renderAvailableExaminers, 
  renderUnAvailableExaminers,
  renderFilter,
  renderHeader} from './../sub-renders';

export const renderAvailableExaminersTable = (state, handlers, props, filterAvailable) => {
  const {showAllExaminers} = state;
  const {availableExaminers} = props;
  return(
    <div>
      <Table labels={[renderHeader(filterAvailable, 'examiners'), null, renderFilter(handlers.ex_filter, handlers, showAllExaminers, 'showAllExaminers')]}></Table>
      <div className={classes.BoxWithMaxHeight}>
        <Table>
          {renderAvailableExaminers([...filterAvailable], state, showAllExaminers)}
          {showAllExaminers && renderUnAvailableExaminers(availableExaminers, state)}
        </Table>
      </div>
    </div>
  )
}