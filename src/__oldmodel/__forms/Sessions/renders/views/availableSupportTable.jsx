import React from 'react';
import Table from '../../../../../components/FormElements/Table/Table';
import classes from '../../../../css/views.css';
import {
  renderAvailableExaminers, 
  renderUnAvailableExaminers,
  renderFilter,
  renderHeader} from './../sub-renders';

export const renderAvailableSupportTable = (state, handlers, props, filterSupport) => {
  const {showAllSupport} = state;
  const {availableSupport} = props;
  return(
    <div>
      <Table labels={[renderHeader(filterSupport, 'support'), null, renderFilter(handlers.supp_filter, handlers, showAllSupport, 'showAllSupport')]}></Table>
      <div className={classes.BoxWithMaxHeight}>
      <Table>
        {renderAvailableExaminers(filterSupport, state, showAllSupport)}
        {showAllSupport && renderUnAvailableExaminers(availableSupport, state)}
      </Table>
      </div>
    </div>
  )
}