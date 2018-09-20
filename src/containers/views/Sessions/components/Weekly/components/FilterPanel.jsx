import React from 'react';
import classes from '../../../Sessions.css';
import * as $ from './utility';

const FilterPanel = ({ weeks, closeOptions, filterByWeek, sessions, weekFilteredBy }) => {
  return (
    <span id="weeks-filter-panel">
      <div>
        <div>
          <span className={classes.SmallLabel}>filter by week beginning</span>
        </div>
        <div>
          {weeks.map(week => (
            <span key="week" className={$.setClasses(week, weekFilteredBy)} onClick={() => filterByWeek(sessions, week)}>{week}</span>
            )
          )}
          <span id="close-options-btn" className={classes.CloseFilter} onClick={closeOptions}>✖</span>
        </div>
      </div>
    </span>
  ) 
}

export default FilterPanel;