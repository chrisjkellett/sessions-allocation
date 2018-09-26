import React from 'react';
import classes from '../../../../css/views.css';
import {renderAvailableExaminersTable} from '../views/availableExaminers';
import {renderAvailableSupportTable} from '../views/availableSupportTable';
import {renderSameDaySessionsTable} from '../views/sameDaySessions';

export const renderViews = (state, filterAvailable, filterSupport, handlers, props) => {
  const {sameDaySessions} = props;
  return (
    <div className={[classes.Box, classes.ViewMode].join(" ")}>
      {renderAvailableExaminersTable(state, handlers, props, filterAvailable)}
      {renderAvailableSupportTable(state, handlers, props, filterSupport)}
      {sameDaySessions.length !== 0 && renderSameDaySessionsTable(state, sameDaySessions)}
    </div>
  )
}
